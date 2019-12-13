CREATE PROCEDURE IF NOT EXISTS calendar_data( IN prefix varchar(20) )
    BEGIN
	    select * from calendar;
    END