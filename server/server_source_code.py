# server code
import datetime

import mysql.connector


class ConnectSQL:
    def __init__(self):
        self.cnx = None
        self.cursor = None
        self.connect_to_db()

    def connect_to_db(self):
        self.cnx = mysql.connector.connect(user='root', password='stGNhgOtr6vCzgBu', host='127.0.0.1',
                                           database='eitan_database', port=3306, buffered=True)
        self.cursor = self.cnx.cursor(buffered=True)

    def check_email_trainer(self, email):
        query = ("SELECT * "
                 " FROM eitan_database.trainer"
                 " WHERE email = %s ")
        self.cursor.execute(query, (email,))
        final = {}
        for (ID, first_name, last_name, email, image, admin) in self.cursor:
            final = {"ID": ID, "first_name": first_name, "last_name": last_name,
                     "email": email, "image": image, "admin": admin}
        return final

    def check_email_trainee(self, email):
        query = ("SELECT * "
                 "FROM eitan_database.trainee"
                 " WHERE email = %s ")
        self.cursor.execute(query, (email,))
        final = {}
        for (ID, first_name, last_name, email, image, group_id) in self.cursor:
            final = {"ID": ID}
        return final

    def get_all_trainees(self, trainer_id):
        query = ("SELECT eitan_database.trainee.ID, eitan_database.trainee.first_name, "
                 "eitan_database.trainee.last_name, eitan_database.trainee.image "
                 "FROM eitan_database.trainer_trainee JOIN eitan_database.trainee ON trainee_id = ID"
                 " WHERE trainer_id = %s")
        self.cursor.execute(query, (trainer_id,))
        final = []
        for (ID, first_name, last_name, image) in self.cursor:
            inside = {"trainee_id": ID, "first_name": first_name, "last_name": last_name, "image": image}
            final.append(inside)
        return final

    # need to change
    def new_train(self, trainer_id, trainees, train_type, train_date_start, train_date_end,
                  train_time_start, train_time_end, description, training_details_id):
        query_add_new_train = ("INSERT INTO eitan_database.all_exercise (trainer_id, train_type,  train_date_start, "
                               "train_date_end, description, train_time_start, train_time_end, training_details_id)"
                               " VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                               )
        query_get_id = ("SELECT train_id "
                        "FROM eitan_database.all_exercise "
                        " WHERE trainer_id = %s AND train_type = %s AND train_time_start = %s AND train_date_start = %s")
        # data = (trainer_id, trainees, train_type, datetime.date(2012, 3, 23), description, datetime.time(08, 00, 00));
        data = (trainer_id, train_type, train_date_start, train_date_end, description, train_time_start, train_time_end,
                training_details_id)

        self.cursor.execute(query_add_new_train, data)
        self.cnx.commit()

        self.cursor.execute(query_get_id, (trainer_id, train_type, train_time_start, train_date_start))
        for (train_id) in self.cursor:
            trainId = train_id
            break
        query_add_participants = ("INSERT INTO eitan_database.match_trainee_trainId (train_id, trainee_id)"
                                  " VALUES (%s, %s)")
        for (trainee) in trainees:
            data = (trainId[0], trainee)
            self.cursor.execute(query_add_participants, data)
        self.cnx.commit()

        return {"train_id": trainId}

    def get_personal_program(self, trainee_id):
        query = ("Select link, program_date "
                 "FROM eitan_database.all_personal_programs"
                 " Where trainee_id = %s"
                 " ORDER BY program_date DESC")
        self.cursor.execute(query, trainee_id)
        final = {}

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
            "train_type, train_time_start, train_time_end, train_date_start, train_date_end, description, t1.train_id as train_id, training_details_id "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainee as t3 "
            " WHERE t3.ID = t2.trainee_id AND t1.train_id = t2.train_id AND t1.trainer_id = %s "
            " GROUP BY t1.train_id "
            " ORDER BY t1.train_date_start, t1.train_time_start DESC ")
        self.cursor.execute(query, (trainer_id,))
        final = []
        for (all_trainees, train_type, train_time_start, train_time_end,
             train_date_start, train_date_end, description, train_id, training_details_id) in self.cursor:
            if (description == 'null'):
                description = "אין תיאור"

            inside = {"train_date_start": str(train_date_start),
                      "train_date_end": str(train_date_end),
                      "train_time_start": str(train_time_start),
                      "train_time_end": str(train_time_end),
                      "all_trainees": all_trainees[0:len(all_trainees)], "description": description,
                      "train_type": train_type, "train_id": train_id, "training_details_id": training_details_id}
            final.append(inside)
        return final

    def get_all_training_history_trainee(self, trainee_id):
        query = (
            "SELECT GROUP_CONCAT(t3.first_name, ' ', t3.last_name) as all_trainees, "
            "train_type, train_time_start, train_time_end, train_date_start, train_date_end, description, t1.train_id as train_id, training_details_id "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainer as t3"
            " WHERE t3.ID = t1.trainer_id AND t1.train_id = t2.train_id AND t2.trainee_id = %s"
            " GROUP BY t1.train_id"
            " ORDER BY t1.train_date_start, t1.train_time_start DESC")
        self.cursor.execute(query, (trainee_id,))
        final = []

        for (all_trainees, train_type, train_time_start, train_time_end,
             train_date_start, train_date_end, description, train_id, training_details_id) in self.cursor:
            if (description == 'null'):
                description = "אין תיאור"

            inside = {"train_date_start": str(train_date_start),
                      "train_date_end": str(train_date_end),
                      "train_time_start": str(train_time_start),
                      "train_time_end": str(train_time_end),
                      "all_trainees": all_trainees[0:len(all_trainees)], "description": description,
                      "train_type": train_type, "train_id": train_id, "training_details_id": training_details_id}
            final.append(inside)
        return final

    def get_upcoming_exercise_trainer(self, trainer_id):
        query = (
            "SELECT GROUP_CONCAT(t3.first_name, ' ', t3.last_name, ', ') as all_trainees, train_type, train_time_start, "
            "train_date_start, description "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainee as t3 "
            " WHERE t3.ID = t2.trainee_id AND t1.train_id = t2.train_id AND t1.trainer_id = %s "
            "AND CONCAT(t1.train_date_start,' ',t1.train_time_start) >= NOW()"
            " GROUP BY t1.train_id"
            " ORDER BY t1.train_date_start, t1.train_time_start DESC")
        self.cursor.execute(query, (trainer_id,))
        final = []
        for (all_trainees, train_type, train_time_start, train_date_start, description) in self.cursor:
            if (description == 'null'):
                description = "אין תיאור"

            inside = {"train_date_start": str(train_date_start), "train_time_start": str(train_time_start),
                      "all_trainees": all_trainees[0:len(all_trainees)],
                      "description": description, "train_type": train_type}
            final.append(inside)
        return final

    def get_upcoming_exercise_trainee(self, trainee_id):
        query = (
            "SELECT GROUP_CONCAT(t3.first_name, ' ', t3.last_name, ', ') as all_trainees, train_type, train_time_start, "
            "train_date_start, description "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainer as t3 "
            " WHERE t3.ID = t1.trainer_id AND t1.train_id = t2.train_id AND t2.trainee_id = %s "
            "AND CONCAT(t1.train_date_start,' ',t1.train_time_start) >= NOW()"
            " GROUP BY t1.train_id"
            " ORDER BY t1.train_date_start, t1.train_time_start DESC")
        self.cursor.execute(query, (trainee_id,))
        final = []
        for (all_trainees, train_type, train_time_start, train_date_start, description) in self.cursor:
            if (description == 'null'):
                description = "אין תיאור"

            inside = {"train_date_start": str(train_date_start), "train_time_start": str(train_time_start),
                      "all_trainees": all_trainees[0:len(all_trainees) - 2],
                      "description": description, "train_type": train_type}
            final.append(inside)
        return final

    def get_training_amount_by_month_trainer(self, trainer_id):
        query = (
            "SELECT MONTH(t1.train_date_start) AS month, COUNT(*) AS training_amount"
            " FROM eitan_database.all_exercise as t1"
            " WHERE YEAR(t1.train_date_start) = YEAR(NOW()) AND t1.trainer_id = %s"
            " GROUP BY MONTH(t1.train_date_start)"
            " ORDER BY MONTH(t1.train_date_start) ASC")
        self.cursor.execute(query, (trainer_id,))
        final = []
        for (month, training_amount) in self.cursor:
            inside = {"month": month, "training_amount": training_amount}
            final.append(inside)
        return final

    def get_training_amount_by_month_trainee(self, trainee_id):
        query = (" SELECT MONTH(t1.train_date_start) AS month, COUNT(*) AS training_amount"
                 " FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2"
                 " WHERE YEAR(t1.train_date_start) = YEAR(NOW()) AND t1.train_id = t2.train_id AND t2.trainee_id = %s"
                 " GROUP BY MONTH(t1.train_date_start)"
                 " ORDER BY MONTH(t1.train_date_start) ASC")
        self.cursor.execute(query, (trainee_id,))
        final = []
        for (month, training_amount) in self.cursor:
            inside = {"month": month, "training_amount": training_amount}
            final.append(inside)
        return final

    def get_type_amount(self, trainee_id):
        query = (" SELECT t1.train_type AS train_type, COUNT(*) AS amount"
                 " FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2"
                 " WHERE YEAR(t1.train_date_start) = YEAR(NOW()) AND t1.train_id = t2.train_id AND t2.trainee_id = %s"
                 " GROUP BY t1.train_type")
        self.cursor.execute(query, (trainee_id,))
        final = []
        for (train_type, amount) in self.cursor:
            inside = {"train_type": train_type, "amount": amount}
            final.append(inside)
        return final

    def send_message(self, trainee_id, trainer_id, mes):
        query = (" SELECT trainee_id, trainer_id, message "
                 " FROM eitan_database.messages"
                 " where trainee_id = %s and trainer_id = %s")
        self.cursor.execute(query, (trainee_id, trainer_id))
        tmp = []
        for (trainee_id, trainer_id, message) in self.cursor:
            inside = {"trainee_id": trainee_id, "trainer_id": trainer_id, "message": message}
            tmp.append(inside)
            break
        if len(tmp) == 0:
            insertQ = (" INSERT INTO eitan_database.messages (trainee_id,trainer_id, message)"
                       " VALUES (%s, %s, %s)")
            self.cursor.execute(insertQ, (trainee_id, trainer_id, mes))
            self.cnx.commit()
        else:
            changeQ = (" UPDATE eitan_database.messages "
                       "SET message = %s, status = 'new' "
                       " WHERE trainee_id = %s AND trainer_id = %s")
            self.cursor.execute(changeQ, (mes, trainee_id, trainer_id))
            self.cnx.commit()

    def get_message(self, trainee_id):
        query = (" SELECT trainee_id, CONCAT( first_name, ' ', last_name) as trainer_name , message, status"
                 " FROM eitan_database.messages AS m, eitan_database.trainer AS t"
                 " where trainee_id = 205380132 AND m.trainer_id = t.ID")
        self.cursor.execute(query, trainee_id)
        inside = {}
        for (trainee_id, trainer_name, message, status) in self.cursor:
            inside = {"trainee_id": trainee_id, "trainer_name": trainer_name, "message": message, "status":status}
        return inside

    def change_message_status(self, trainee_id):
        changeQ = (" UPDATE eitan_database.messages "
                   "SET status = 'old' "
                   " WHERE trainee_id = %s ")
        self.cursor.execute(changeQ, trainee_id)
        self.cnx.commit()

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
        self.cursor.execute(query, (string,))
        return [train_type for (train_type,) in self.cursor]

    def get_all_train_type(self):
        query = ("SELECT train_type "
                 "FROM eitan_database.train_type")
        self.cursor.execute(query)
        return [train_type for (train_type,) in self.cursor]

    def __del__(self):
        if self.cnx:
            self.cnx.close()

# if __name__ == '__main__':
#     a = ConnectSQL()
#     query1 = ("SELECT * "
#               " FROM eitan_database.trainer")
#     a.cursor.execute(query1, ())
#     f = a.check_email_trainee("yuvali1994@gmail.com")
#     print(f)
#     # a.cnx.close()
