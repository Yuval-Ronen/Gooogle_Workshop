# server code
import mysql.connector

class ConnectSQL:
    def __init__(self):
        self.cnx = None
        self.cursor = None
        self.connect_to_db()

    def connect_to_db(self):
        self.cnx = mysql.connector.connect(user='root', password='stGNhgOtr6vCzgBu', host='35.193.242.182',
                                           database='eitan_database', port="3306")
        self.cursor = self.cnx.cursor()

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
            final = {"ID": ID, "first_name": first_name, "last_name": last_name,
                     "email": email, "image": image, "group_id": group_id}
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

    def new_train(self, trainer_id, trainees, train_type, train_date_start, train_date_end,
                  train_time_start, train_time_end, description, training_details_id, rRule, exDate):
        if exDate == "null":
            exDate = ""
        if rRule == "null":
            rRule = ""
        query_add_new_train = ("INSERT INTO eitan_database.all_exercise (trainer_id, train_type,  train_date_start, "
                               "train_date_end, description, train_time_start, train_time_end, training_details_id, "
                               "rRule, exDate) "
                               " VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                               )
        query_get_id = ("SELECT train_id "
                        "FROM eitan_database.all_exercise "
                        " WHERE trainer_id = %s AND train_type = %s AND train_time_start = %s AND train_date_start = %s"
                        " AND train_date_end = %s AND train_time_end  = %s AND training_details_id = %s AND rRule = %s "
                        "AND exDate = %s")

        data = (trainer_id, train_type, train_date_start, train_date_end, description, train_time_start, train_time_end,
                training_details_id, rRule, exDate)
        print(data)
        self.cursor.execute(query_add_new_train, data)
        self.cnx.commit()

        self.cursor.execute(query_get_id, (trainer_id, train_type, train_time_start, train_date_start, train_date_end,
                                           train_time_end, training_details_id, rRule, exDate))
        for (train_id) in self.cursor:
            trainId = train_id
            break
        print("train_id", trainId[0])
        query_add_participants = ("INSERT INTO eitan_database.match_trainee_trainId (train_id, trainee_id)"
                                  " VALUES (%s, %s)")
        print("trainees", trainees)

        for (trainee) in trainees:
            data = (trainId[0], int(trainee))
            self.cursor.execute(query_add_participants, data, )
        print("trainees", trainees)
        self.cnx.commit()

        return {"train_id": trainId}

    def update_exercise(self, changed_data):
        # i want to get the the old data so i wont have to do the chnage in a loop
        get_event_query = (
            "SELECT trainer_id, train_type, train_date_start, train_date_end, description, train_time_start, "
            "train_time_end, training_details_id, rRule, exDate "
            " FROM eitan_database.all_exercise "
            " WHERE train_id = %s ")
        self.cursor.execute(get_event_query, (int(changed_data["train_id"]),))
        info = {}
        for (trainer_id, train_type, train_date_start, train_date_end, description, train_time_start, train_time_end,
             training_details_id, rRule, exDate) in self.cursor:
            info = {"trainer_id": trainer_id, "train_type": train_type, "train_date_start": train_date_start,
                    "train_date_end": train_date_end, "description": description,
                    "train_time_start": train_time_start, "train_time_end": train_time_end,
                    "training_details_id": training_details_id, "rRule": rRule, "exDate": exDate}
        # insert to changed the missing data
        for field in info.keys():
            if field not in changed_data.keys():
                changed_data[field] = info[field]
            elif field == "rRule":
                changed_data[field] += info[field]

        print(changed_data)

        query = ("UPDATE eitan_database.all_exercise "
                 "SET train_type = %s,  train_date_start = %s, train_date_end = %s, description = %s, "
                 "train_time_start = %s, train_time_end = %s, training_details_id = %s, rRule = %s, exDate = %s"
                 " WHERE train_id = %s"
                 )
        self.cursor.execute(query, (
            changed_data["train_type"], changed_data["train_date_start"], changed_data["train_date_end"],
            changed_data["description"],
            changed_data["train_time_start"], changed_data["train_time_end"], changed_data["training_details_id"],
            changed_data["rRule"], changed_data["exDate"], int(changed_data["train_id"]), ))

        # if we changed the trainees in the event need to change the match in the train id
        if "Trainees" in changed_data.keys():
            query_add_participants = ("INSERT INTO eitan_database.match_trainee_trainId (train_id, trainee_id)"
                                      " VALUES (%s, %s)")

            # delete the old participants
            query_to_delete = "DELETE FROM eitan_database.match_trainee_trainId WHERE train_id = %s"
            self.cursor.execute(query_to_delete, (changed_data["train_id"], ))
            # change participants
            for trainee in changed_data["Trainees"]:
                data = (changed_data["train_id"], trainee)
                self.cursor.execute(query_add_participants, data)
        self.cnx.commit()
        print("finish update")

        return {}

    def delete_exercise(self, train_id):
        delete_query_all_exercise = "DELETE FROM eitan_database.all_exercise WHERE train_id = %s"
        self.cursor.execute(delete_query_all_exercise, (train_id, ))
        self.cnx.commit()
        delete_query_match_trainee_trainId = "DELETE FROM eitan_database.match_trainee_trainId WHERE train_id = %s"
        self.cursor.execute(delete_query_match_trainee_trainId, (train_id, ))
        self.cnx.commit()
        return {}

    def get_all_training_history_trainer(self, trainer_id):
        query = (
            "SELECT GROUP_CONCAT(' ' ,t3.first_name, ' ', t3.last_name) as all_trainees, "
            "train_type, train_time_start, train_time_end, train_date_start, train_date_end, description, "
            "t1.train_id as train_id, training_details_id, rRule, exDate "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainee as t3 "
            " WHERE t3.ID = t2.trainee_id AND t1.train_id = t2.train_id AND t1.trainer_id = %s "
            " AND train_date_end < now() "
            " GROUP BY t1.train_id "
            " ORDER BY t1.train_date_start DESC, t1.train_time_start ASC ")
        self.cursor.execute(query, (trainer_id,))
        final = []
        for (all_trainees, train_type, train_time_start, train_time_end,
             train_date_start, train_date_end, description, train_id,
             training_details_id, rRule, exDate) in self.cursor:
            if description == 'null':
                description = "אין תיאור"
            # if rRule.find("RRULE") != 0: #this condition check if we have rRule relevant to this exercise
            #     Date_required = train_date_start + datetime.timedelta(days=7)
            #     Date_required = train_date_start + datetime.timedelta(weeks=7)

            inside = {"train_date_start": str(train_date_start),
                      "train_date_end": str(train_date_end),
                      "train_time_start": str(train_time_start),
                      "train_time_end": str(train_time_end),
                      "all_trainees": all_trainees[1:len(all_trainees)], "description": description,
                      "train_type": train_type, "train_id": train_id, "training_details_id": training_details_id}
            final.append(inside)
        return final

    def get_all_training_history_trainee(self, trainee_id):
        query = (
            "SELECT GROUP_CONCAT(t3.first_name, ' ', t3.last_name) as all_trainees, "
            " train_type, train_time_start, train_time_end, train_date_start, train_date_end, description, "
            "t1.train_id as train_id, training_details_id, rRule, exDate "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainer as t3"
            " WHERE t3.ID = t1.trainer_id AND t1.train_id = t2.train_id AND t2.trainee_id = %s"
            " AND train_date_end < now() "            
            " GROUP BY t1.train_id"
            " ORDER BY t1.train_date_start DESC, t1.train_time_start ASC")
        self.cursor.execute(query, (trainee_id,))
        final = []

        for (all_trainees, train_type, train_time_start, train_time_end,
             train_date_start, train_date_end, description, train_id, training_details_id, rRule,
             exDate) in self.cursor:
            if description == 'null':
                description = "אין תיאור"

            inside = {"train_date_start": str(train_date_start),
                      "train_date_end": str(train_date_end),
                      "train_time_start": str(train_time_start),
                      "train_time_end": str(train_time_end),
                      "all_trainees": all_trainees, "description": description,
                      "train_type": train_type, "train_id": train_id, "training_details_id": training_details_id,
                      "rRule": rRule, "exDate": exDate}
            final.append(inside)
        return final

    def get_upcoming_exercise_trainer(self, trainer_id):
        query = (
            "SELECT GROUP_CONCAT(' ', t3.first_name, ' ', t3.last_name) as all_trainees, train_type, train_time_start, "
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
                      "all_trainees": all_trainees[1:len(all_trainees)],
                      "description": description, "train_type": train_type}
            final.append(inside)
        return final

    def get_all_trainer_calendar(self, trainer_id):
        query_all_trainees = ("SELECT eitan_database.trainee.ID, eitan_database.trainee.first_name, "
                              "eitan_database.trainee.last_name, eitan_database.trainee.image "
                              "FROM eitan_database.trainer_trainee JOIN eitan_database.trainee ON trainee_id = ID"
                              " WHERE trainer_id = %s")
        self.cursor.execute(query_all_trainees, (trainer_id,))
        allTrainees = []
        for (ID, first_name, last_name, image) in self.cursor:
            inside = {"trainee_id": ID, "first_name": first_name, "last_name": last_name, "image": image}
            allTrainees.append(inside)

        query_all_exercise = (
            "SELECT GROUP_CONCAT(' ', t3.ID) as all_trainees, "
            "train_type, train_time_start, train_time_end, train_date_start, train_date_end, description, "
            "t1.train_id as train_id, training_details_id, rRule, exDate "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainee as t3 "
            " WHERE t3.ID = t2.trainee_id AND t1.train_id = t2.train_id AND t1.trainer_id = %s "
            " GROUP BY t1.train_id "
            " ORDER BY t1.train_date_start, t1.train_time_start DESC ")
        self.cursor.execute(query_all_exercise, (trainer_id,))
        allExercise = []
        for (all_trainees, train_type, train_time_start, train_time_end,
             train_date_start, train_date_end, description, train_id, training_details_id, rRule,
             exDate) in self.cursor:
            if description == 'null':
                description = "אין תיאור"

            inside = {"train_date_start": str(train_date_start),
                      "train_date_end": str(train_date_end),
                      "train_time_start": str(train_time_start),
                      "train_time_end": str(train_time_end),
                      "all_trainees": all_trainees[1:len(all_trainees)], "description": description,
                      "train_type": train_type, "train_id": train_id, "training_details_id": training_details_id,
                      "rRule": rRule, "exDate": exDate}
            allExercise.append(inside)
        return {"allTrainees": allTrainees, "allExercise": ["מאמן", allExercise]}

    def get_all_trainer_dashboard(self, trainer_id):
        trainingHis = self.get_upcoming_exercise_trainer(trainer_id)
        dataSource = self.get_training_amount_by_month_trainer(trainer_id)
        return {"trainingHis": ["מתאמנים", trainingHis], "dataSource": dataSource}

    def get_all_for_trainee_page_in_trainer(self, trainee_id):
        trainingHis = self.get_all_training_history_trainee(trainee_id)
        dataSource = self.get_training_amount_by_month_trainee(trainee_id)
        print("dataSource", dataSource)

        return {"trainingHis": ["מאמן", trainingHis], "dataSource": dataSource}

    def get_all_trainee_dashboard(self, trainee_id):
        dataSource = self.get_training_amount_by_month_trainee(trainee_id)
        trainingHis = self.get_upcoming_exercise_trainee(trainee_id)

        query3 = (" SELECT t1.train_type AS train_type, COUNT(*) AS amount"
                  " FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2"
                  " WHERE YEAR(t1.train_date_start) = YEAR(NOW()) AND t1.train_id = t2.train_id AND t2.trainee_id = %s"
                  " GROUP BY t1.train_type")
        self.cursor.execute(query3, (trainee_id,))
        dataSourcePie = []
        for (train_type, amount) in self.cursor:
            inside = {"train_type": train_type, "amount": amount}
            dataSourcePie.append(inside)

        query4 = (
            " SELECT CONCAT( first_name, ' ', last_name) as trainer_name, m.trainer_id as trainer_id , message, status"
            " FROM eitan_database.messages AS m, eitan_database.trainer AS t"
            " where m.trainee_id = %s AND m.trainer_id = t.ID")

        self.cursor.execute(query4, (trainee_id,))
        final_old_message = []
        final_new_message = []
        res_status = "old"
        for (trainer_name, trainer_id, message, status) in self.cursor:
            if status == "new":
                res_status = "new"
                final_new_message.append(
                    {"trainer_name": trainer_name, "trainer_id": trainer_id, "message": message, "status": status})
            else:
                final_old_message.append(
                    {"trainer_name": trainer_name, "trainer_id": trainer_id, "message": message, "status": status})

        return {"dataSource": dataSource, "dataSourcePie": dataSourcePie, "trainingHis": ["מאמן", trainingHis],
                "allMessages": [res_status, final_new_message + final_old_message]}

    def get_upcoming_exercise_trainee(self, trainee_id):
        query = (
            "SELECT GROUP_CONCAT(t3.first_name, ' ', t3.last_name) as all_trainees, train_type, train_time_start, "
            "train_date_start, description "
            "FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2, "
            "eitan_database.trainer as t3 "
            " WHERE t3.ID = t1.trainer_id AND t1.train_id = t2.train_id AND t2.trainee_id = %s "
            "AND CONCAT(t1.train_date_start,' ',t1.train_time_start) >= NOW()"
            " GROUP BY t1.train_id"
            " ORDER BY t1.train_date_start , t1.train_time_start DESC"
            " LIMIT 3")
        self.cursor.execute(query, (trainee_id,))
        final = []
        for (all_trainees, train_type, train_time_start, train_date_start, description) in self.cursor:
            if (description == 'null'):
                description = "אין תיאור"

            inside = {"train_date_start": str(train_date_start), "train_time_start": str(train_time_start),
                      "all_trainees": all_trainees,
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
        all_months = []
        for (month, training_amount) in self.cursor:
            inside = {"month": month, "training_amount": training_amount}
            final.append(inside)
            all_months.append(month)
        return {"final": final, "all_months": all_months}

    def get_training_amount_by_month_trainee(self, trainee_id):
        query = (" SELECT MONTH(t1.train_date_start) AS month, COUNT(*) AS training_amount"
                 " FROM eitan_database.all_exercise as t1, eitan_database.match_trainee_trainId as t2"
                 " WHERE YEAR(t1.train_date_start) = YEAR(NOW()) AND t1.train_id = t2.train_id AND t2.trainee_id = %s"
                 " GROUP BY MONTH(t1.train_date_start)"
                 " ORDER BY MONTH(t1.train_date_start) ASC")
        self.cursor.execute(query, (trainee_id,))
        final = []
        all_months = []
        for (month, training_amount) in self.cursor:
            inside = {"month": month, "training_amount": training_amount}
            final.append(inside)
            all_months.append(month)
        return {"final": final, "all_months": all_months}

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
                 " where trainee_id = %s AND m.trainer_id = t.ID")
        self.cursor.execute(query, (trainee_id,))
        final_old_message = []
        final_new_message = []
        res_status = "old"
        for (trainee_id, trainer_name, message, status) in self.cursor:
            if status == "new":
                res_status = "new"
                final_new_message.append(
                    {"trainee_id": trainee_id, "trainer_name": trainer_name, "message": message, "status": status})
            else:

                final_old_message.append(
                    {"trainee_id": trainee_id, "trainer_name": trainer_name, "message": message, "status": status})
        return [res_status, final_new_message + final_old_message]

    def change_message_status(self, message_list):
        trainee_id = int(message_list[0])
        all_messages = message_list[1:len(message_list)]
        changeQ = (" UPDATE eitan_database.messages"
                   " SET status = 'old'"
                   " WHERE trainee_id = %s AND trainer_id = %s")
        for item in all_messages:
            self.cursor.execute(changeQ, (trainee_id, int(item["trainer_id"]),))
        self.cnx.commit()
        print(self.cursor)
        return "changed"

    def get_personal_program_link(self, trainee_id):
        getLinkQ = (" SELECT trainer_id, link "
                    "FROM eitan_database.all_personal_program"
                    " WHERE trainee_id = %s")
        self.cursor.execute(getLinkQ, (int(trainee_id),))
        ret_link = ""
        for (trainer_id, link) in self.cursor:
            ret_link = link
            break
        return ret_link

    def insert_new_personal_program_link(self, trainee_id, trainer_id, link):
        getLinkQ = (" INSERT INTO eitan_database.all_personal_program(trainee_id, trainer_id, link)"
                    " VALUES (%s, %s, %s) ")
        self.cursor.execute(getLinkQ, (int(trainee_id), int(trainer_id), link, ))
        self.cnx.commit()
        print(self.cursor)
        return "uploaded"

    def update_personal_program_link(self, trainee_id, link):
        getLinkQ = (" UPDATE eitan_database.all_personal_program"
                    " SET link = %s"
                    " WHERE trainee_id = %s")
        self.cursor.execute(getLinkQ, (link, int(trainee_id),))
        self.cnx.commit()
        return "updated"


    # def auto_complete_trainee(self, string, trainer_id):
    #     string = string + "%"
    #     query = ("SELECT CONCAT( first_name, ' ', last_name) as full_name, ID "
    #              "FROM eitan_database.trainee as t, eitan_database.trainer_trainee as t2"
    #              " WHERE t2.trainee_id = t.ID AND t2.trainer_id = %s AND CONCAT( first_name, ' ', last_name) LIKE %s")
    #     self.cursor.execute(query, (trainer_id, string))
    #     # for (full_name, ID) in self.cursor:
    #     #     final = {"full_name": full_name, "trainee_id": ID}
    #     # return final
    #     return [full_name for (full_name,) in self.cursor]
    #
    # def auto_complete_train_type(self, string):
    #     string = string + "%"
    #     query = ("SELECT train_type "
    #              "FROM eitan_database.train_type"
    #              " WHERE type LIKE %s")
    #     self.cursor.execute(query, (string,))
    #     return [train_type for (train_type,) in self.cursor]

    def get_all_train_type(self):
        query = ("SELECT train_type "
                 "FROM eitan_database.train_type")
        self.cursor.execute(query)
        return [train_type for (train_type,) in self.cursor]

    def __del__(self):
        if self.cnx:
            self.cnx.close()


