from server_source_code import ConnectSQL


class sqlManager:
    def __init__(self):
        self.sql_c = None
        self.VALID_MOVIE_IDS = None
        self.VALID_ACTOR_IDS = None

    def total_setup(self):
        self.sql_c = ConnectSQL()


# create new ConnectSQL obj
sql_manager = sqlManager()
sql_manager.total_setup()
