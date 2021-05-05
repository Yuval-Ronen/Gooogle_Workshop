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

    def __del__(self):
        if self.cnx:
            self.cnx.close()
