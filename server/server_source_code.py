# server code
import mysql.connector


class ConnectSQL:
    def __init__(self):
        self.cnx = None
        self.cursor = None
        self.connect_to_db()

    def connect_to_db(self):
        self.cnx = mysql.connector.connect(user='root', password='stGNhgOtr6vCzgBu', host='localhost',
                                           database='eitan_database', port=3306)
        self.cursor = self.cnx.cursor()

    def check_email_trainer(self, email):
        query = ("SELECT * "
                 " FROM eitan_database.trainer"
                 " WHERE email = 'yuvalronen10@gmail.com' ")
        self.cursor.execute(query, (email,))
        for (ID, first_name, last_name, email, image, admin) in self.cursor:
            final = {"ID": ID, "first_name": first_name, "last_name": last_name,
                     "email": email, "image": image, "admin": admin}
        return final

    def check_email_trainee(self, email):
        query = ("SELECT * "
                 "FROM eitan_database.trainee"
                 " WHERE email = %s ")
        self.cursor.execute(query, (email,))
        for (ID, first_name, last_name, email, image) in self.cursor:
            final = {"ID": ID, "first_name": first_name, "last_name": last_name,
                     "email": email, "image": image}
        return final

    def get_all_trainees(self, trainer_id):
        query = ("SELECT eitan_database.trainee.ID, eitan_database.trainee.first_name, "
                 "eitan_database.trainee.last_name, eitan_database.trainee.image "
                 "FROM eitan_database.trainer_trainee JOIN eitan_database.trainee ON trainee_id = ID"
                 " WHERE trainer_id = %s")
        self.cursor.execute(query, (trainer_id,))
        for (ID, first_name, last_name, image) in self.cursor:
            final = {"traineeID": ID, "first_name": first_name, "last_name": last_name, "image": image}
        return final

    # need to change
    # def new_train(self, trainer_id, trainees_or_group, train_type, trainDate, trainTime, description):
    #     query_add_new_train = ("INSERT INTO eitan_database.all_training (trainer_id, train_type,  train_date,"
    #                            " description, train_time, status)"
    #                            "VALUES (%s, %s, %s, %s, %s, Open)")
    #     query_get_id = ("SELECT train_id "
    #                     "FROM eitan_database.all_training t"
    #                     "WHERE trainer_id = %s AND train_type = %s AND train_time = %s AND train_date = %s")
    #     self.cursor.execute(query_add_new_train,
    #                         (trainer_id, trainees_or_group, train_type, trainDate, description, trainTime))
    #     self.cnx.commit()
    #
    #     self.cursor.execute(query_get_id, (trainer_id, train_type, trainTime, trainDate))
    #     for (train_id) in self.cursor:
    #         trainId = train_id
    #         break
    #
    #     query_add_participants = ("INSERT INTO eitan_database.match_trainee_trainId (train_id, trainee_id)"
    #                               "VALUES (%s, %s)")
    #
    #     for (trainee) in trainees_or_group:
    #         self.cursor.execute(query_add_participants, (trainId, trainee_id))
    #         self.cnx.commit()
    #
    #     return self.cursor

    def get_personal_program(self, trainee_id):
        query = ("Select link, program_date "
                 "FROM eitan_database.all_personal_programs"
                 " Where trainee_id = %s"
                 " ORDER BY program_date DESC")
        self.cursor.execute(query, trainee_id)
        for (link, program_date) in self.cursor:
            final = {"link": link, "program_date": program_date}
        return final

    # need to check
    def set_personal_program(self, trainer_id, trainee_id, program):
        query = ("INSERT INTO eitan_database.all_personal_programs (trainee_id, trainer_id, program_date, program)"
                 "VALUES (%s, %s, NOW(), %s)")
        self.cursor.execute(query, (trainee_id, trainer_id, program))
        self.cnx.commit()

        return self.cursor

    def get_all_training_history_trainer(self, trainer_id):
        query = (
            "SELECT GROUP_CONCAT(t3.first_name, ' ', t3.last_name, ', ') as all_trainees, "
            "train_type, train_time, train_date, description, status "
            "FROM eitan_database.all_training as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainee as t3"
            " WHERE t3.ID = t2.trainee_id AND t1.train_id = t2.train_id AND t1.trainer_id = %s"
            " GROUP BY t1.train_id"
            " ORDER BY t1.train_date, t1.train_time DESC")
        self.cursor.execute(query, trainer_id)
        for (all_trainees, train_type, train_time, train_date, description, status) in self.cursor:
            final = {"train_date": train_date, "train_time": train_time, "all_trainees": all_trainees,
                     "description": description, "train_type": train_type, "status": status}
        return final

    def get_all_training_history_trainee(self, trainee_id):
        query = (
            "SELECT GROUP_CONCAT(t3.first_name, ' ', t3.last_name, ', ') as all_trainees, "
            "train_type, train_time, train_date, description "
            "FROM eitan_database.all_training as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainee as t3"
            " WHERE t3.ID = t2.trainee_id AND t1.train_id = t2.train_id AND t1.trainee_id = %s"
            " GROUP BY t1.train_id"
            " ORDER BY t1.train_date, t1.train_time DESC")
        self.cursor.execute(query, trainee_id)
        for (all_trainees, train_type, train_time, train_date, description) in self.cursor:
            final = {"train_date": train_date, "train_time": train_time, "all_trainees": all_trainees,
                     "description": description, "train_type": train_type}
        return final

    def auto_complete_trainee(self, string, trainer_id):
        string = string + "%"
        query = ("SELECT CONCAT( first_name, ' ', last_name) as full_name, ID "
                 "FROM eitan_database.trainee as t, eitan_database.trainer_trainee as t2"
                 " WHERE t2.trainee_id = t.ID AND t2.trainer_id = %s AND CONCAT( first_name, ' ', last_name) LIKE %s")
        self.cursor.execute(query, (trainer_id, string))
        # for (full_name, ID) in self.cursor:
        #     final = {"full_name": full_name, "trainee_id": ID}
        # return final
        return [full_name for (full_name,) in self.cursor]

    def auto_complete_train_type(self, string):
        string = string + "%"
        query = ("SELECT train_type "
                 "FROM eitan_database.train_type"
                 " WHERE type LIKE %s")
        self.cursor.execute(query, string)
        return [train_type for (train_type,) in self.cursor]

    def get_all_train_type(self):
        query = ("SELECT train_type "
                 "FROM eitan_database.train_type")
        self.cursor.execute(query)
        return [train_type for (train_type,) in self.cursor]

    def __del__(self):
        if self.cnx:
            self.cnx.close()
