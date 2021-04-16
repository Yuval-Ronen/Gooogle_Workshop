## .sql script which creates the DB


CREATE TABLE `DbMysql18`.`Movie_metadata` (
  `ID` INT NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Release_date` DATETIME NOT NULL,
  `Original_language` VARCHAR(5) NOT NULL,
  `Status` VARCHAR(17) NOT NULL,
  `Runtime` INT NULL,
  `Budget` INT NOT NULL,
  `Revenue` INT NOT NULL,
  `Popularity` DECIMAL(6,2) NOT NULL,
  `Vote_average` DECIMAL(3,1) NOT NULL,
  `Vote_count` INT NOT NULL,
  `Poster_path` VARCHAR(150) NULL,
  `Backdrop_path` VARCHAR(150) NULL,
  `Overview` VARCHAR(2000) NULL,
  PRIMARY KEY (`ID`));

CREATE TABLE `DbMysql18`.`Movie_genres` (
  `ID` INT NOT NULL,
  `Genre_name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`, `Genre_name`));

CREATE TABLE `DbMysql18`.`Movie_actors` (
  `ID` INT NOT NULL,
  `Actor_id` INT NOT NULL,
  `Actor_character` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`, `Actor_id`));

CREATE TABLE `DbMysql18`.`Actor_metadata` (
  `Actor_id` INT NOT NULL,
  `Actor_name` VARCHAR(200) NOT NULL,
  `Gender` INT NULL,
  `Popularity` DECIMAL(6,2) NOT NULL,
  `Profile_path` VARCHAR(200) NULL,
  PRIMARY KEY (`Actor_id`));

CREATE TABLE `DbMysql18`.`Movie_crew` (
  `ID` INT NOT NULL,
  `Crew_id` INT NOT NULL,
  `Department` VARCHAR(200) NOT NULL,
  `Job` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`, `Crew_id`, `Department`, `Job`));

CREATE TABLE `DbMysql18`.`Crew_metadata` (
  `Crew_id` INT NOT NULL,
  `Crew_name` VARCHAR(200) NOT NULL,
  `Gender` INT NULL,
  `Popularity` DECIMAL(6,2) NOT NULL,
  `Profile_path` VARCHAR(200) NULL,
  PRIMARY KEY (`Crew_id`));

CREATE TABLE `DbMysql18`.`Movie_keywords` (
  `ID` INT NOT NULL,
  `Keyword` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`, `Keyword`));

CREATE TABLE `DbMysql18`.`Movie_ratings` (
  `User_id` INT NOT NULL,
  `Movie_id` INT NOT NULL,
  `Rating` DECIMAL(2,1) NOT NULL,
  PRIMARY KEY (`User_id`, `Movie_id`));

CREATE VIEW `all_genres_view` AS(
    SELECT `Movie_genres`.`ID` AS `ID`, GROUP_CONCAT(`Movie_genres`.`Genre_name` SEPARATOR ',') AS `all_genres`
    FROM `Movie_genres`
    GROUP BY `Movie_genres`.`ID`);

CREATE VIEW `Movie_keywords_view` AS(
    SELECT `Movie_keywords`.`ID` AS `ID`, GROUP_CONCAT(`Movie_keywords`.`Keyword`, ' ' SEPARATOR ',') AS `all_keywords`
    FROM `Movie_keywords`
    GROUP BY `Movie_keywords`.`ID`);

CREATE VIEW `user_rating_view` AS(
    SELECT `Movie_ratings`.`Movie_id` AS `Movie_id`, AVG(`Movie_ratings`.`Rating`) AS `user_rating`
    FROM `Movie_ratings`
    GROUP BY `Movie_ratings`.`Movie_id`);

CREATE INDEX title_metadata on Movie_metadata(Title(10))
CREATE INDEX Actor_name_metadata on Actor_metadata(Actor_name(10))
CREATE INDEX Movie_metadata_Popularity on Movie_metadata(Popularity)
CREATE INDEX Actor_metadata_Popularity on Actor_metadata(Popularity)
CREATE INDEX Movie_metadata_Vote_average on Movie_metadata(Vote_average)
CREATE INDEX Movie_metadata_Original_language on Movie_metadata(Original_language) using HASH
CREATE INDEX Movie_metadata_Revenue on Movie_metadata(Revenue)
CREATE FULLTEXT INDEX description ON Movie_metadata(Overview)
