1 - Display all Sales Support Agents with their first name and last name
SELECT * from Employee
WHERE Title ="Sales Support Agent" 

+------------+----------+-----------+---------------------+-----------+---------------------+---------------------+------------------+---------+-------+---------+------------+-------------------+-------------------+--------------------------+
| EmployeeId | LastName | FirstName | Title               | ReportsTo | BirthDate           | HireDate            | Address          | City    | State | Country | PostalCode | Phone             | Fax               | Email                    |
+------------+----------+-----------+---------------------+-----------+---------------------+---------------------+------------------+---------+-------+---------+------------+-------------------+-------------------+--------------------------+
|          3 | Peacock  | Jane      | Sales Support Agent |         2 | 1973-08-29 00:00:00 | 2002-04-01 00:00:00 | 1111 6 Ave SW    | Calgary | AB    | Canada  | T2P 5M5    | +1 (403) 262-3443 | +1 (403) 262-6712 | jane@chinookcorp.com     |
|          4 | Park     | Margaret  | Sales Support Agent |         2 | 1947-09-19 00:00:00 | 2003-05-03 00:00:00 | 683 10 Street SW | Calgary | AB    | Canada  | T2P 5G3    | +1 (403) 263-4423 | +1 (403) 263-4289 | margaret@chinookcorp.com |
|          5 | Johnson  | Steve     | Sales Support Agent |         2 | 1965-03-03 00:00:00 | 2003-10-17 00:00:00 | 7727B 41 Ave     | Calgary | AB    | Canada  | T3B 1Y7    | 1 (780) 836-9987  | 1 (780) 836-9543  | steve@chinookcorp.com    |
+------------+----------+-----------+---------------------+-----------+---------------------+---------------------+------------------+---------+-------+---------+------------+-------------------+-------------------+--------------------------+
2 - Display all employees hired between 2002 and 2003, and display their first name and last name

Select LastName, FirstName from Employee 
WHERE HireDate between '2002-01-01' AND '2003-12-30'

+----------+-----------+
| LastName | FirstName |
+----------+-----------+
| Adams    | Andrew    |
| Edwards  | Nancy     |
| Peacock  | Jane      |
| Park     | Margaret  |
| Johnson  | Steve     |
| Mitchell | Michael   |
+----------+-----------+

3 - Display all artists that have the word 'Metal' in their name
Select * from Artist WHERE Name LIKE "%Metal%";
+----------+-----------+
| ArtistId | Name      |
+----------+-----------+
|       50 | Metallica |
+----------+-----------+
1 row in set (0.00 sec)

4 - Display all employees who are in sales (sales manager, sales rep etc.)
SELECT * FROM Employee  WHERE Title LIKE "%SALES%";
+------------+----------+-----------+---------------------+-----------+---------------------+---------------------+------------------+---------+-------+---------+------------+-------------------+-------------------+--------------------------+
| EmployeeId | LastName | FirstName | Title               | ReportsTo | BirthDate           | HireDate            | Address          | City    | State | Country | PostalCode | Phone             | Fax               | Email                    |
+------------+----------+-----------+---------------------+-----------+---------------------+---------------------+------------------+---------+-------+---------+------------+-------------------+-------------------+--------------------------+
|          2 | Edwards  | Nancy     | Sales Manager       |         1 | 1958-12-08 00:00:00 | 2002-05-01 00:00:00 | 825 8 Ave SW     | Calgary | AB    | Canada  | T2P 2T3    | +1 (403) 262-3443 | +1 (403) 262-3322 | nancy@chinookcorp.com    |
|          3 | Peacock  | Jane      | Sales Support Agent |         2 | 1973-08-29 00:00:00 | 2002-04-01 00:00:00 | 1111 6 Ave SW    | Calgary | AB    | Canada  | T2P 5M5    | +1 (403) 262-3443 | +1 (403) 262-6712 | jane@chinookcorp.com     |
|          4 | Park     | Margaret  | Sales Support Agent |         2 | 1947-09-19 00:00:00 | 2003-05-03 00:00:00 | 683 10 Street SW | Calgary | AB    | Canada  | T2P 5G3    | +1 (403) 263-4423 | +1 (403) 263-4289 | margaret@chinookcorp.com |
|          5 | Johnson  | Steve     | Sales Support Agent |         2 | 1965-03-03 00:00:00 | 2003-10-17 00:00:00 | 7727B 41 Ave     | Calgary | AB    | Canada  | T3B 1Y7    | 1 (780) 836-9987  | 1 (780) 836-9543  | steve@chinookcorp.com    |
+------------+----------+-----------+---------------------+-----------+---------------------+---------------------+------------------+---------+-------+---------+------------+-------------------+-------------------+--------------------------+


5 - Display the titles of all tracks which has the genre "easy listening"
SELECT * , Genre.Name FROM Track 
JOIN Genre 
ON Track.GenreId = Genre.GenreId
WHERE Genre.Name LIKE "easy listening";

+---------+-----------------------------------+---------+-------------+---------+--------------------------------------------------------------+--------------+---------+-----------+---------+----------------+----------------+
| TrackId | Name                              | AlbumId | MediaTypeId | GenreId | Composer                                                     | Milliseconds | Bytes   | UnitPrice | GenreId | Name           | Name           |
+---------+-----------------------------------+---------+-------------+---------+--------------------------------------------------------------+--------------+---------+-----------+---------+----------------+----------------+
|    1033 | My Way                            |      83 |           1 |      12 | claude françois/gilles thibault/jacques revaux/paul anka     |       275879 | 8928684 |      0.99 |      12 | Easy Listening | Easy Listening |
|    1034 | Strangers In The Night            |      83 |           1 |      12 | berthold kaempfert/charles singleton/eddie snyder            |       155794 | 5055295 |      0.99 |      12 | Easy Listening | Easy Listening |

6 - Display all the tracks from all albums along with the genre of each track

SELECT *, Genre.GenreId  FROM Track 
JOIN Genre 
ON Track.GenreId = Genre.GenreId ;

7 - Using the Invoice table, show the average payment made for each country

SELECT BillingCountry, AVG(Total) FROM Invoice
GROUP BY BillingCountry

+----------------+------------+
| BillingCountry | AVG(Total) |
+----------------+------------+
| Germany        |   5.588571 |
| Norway         |   5.660000 |
| Belgium        |   5.374286 |
| Canada         |   5.427857 |
| USA            |   5.747912 |
| France         |   5.574286 |
| Ireland        |   6.517143 |
| United Kingdom |   5.374286 |
| Australia      |   5.374286 |
| Chile          |   6.660000 |
| India          |   5.789231 |
| Brazil         |   5.431429 |
| Portugal       |   5.517143 |
| Netherlands    |   5.802857 |
| Spain          |   5.374286 |
| Sweden         |   5.517143 |
| Czech Republic |   6.445714 |
| Finland        |   5.945714 |
| Denmark        |   5.374286 |
| Italy          |   5.374286 |
| Poland         |   5.374286 |
| Austria        |   6.088571 |
| Hungary        |   6.517143 |
| Argentina      |   5.374286 |

8 - Using the Invoice table, show the average payment made for each country, but only for countries that paid more than 1,00 in total average

SELECT BillingCountry, AVG(Total) FROM Invoice GROUP BY BillingCountry
     HAVING AVG(Total) >100;

     INCorrect 
9 - Using the Invoice table, show the average payment made for each customer, but only for customer reside in Germany and only if that customer has paid more than 10in total
SELECT CustomerId, BillingCountry, AVG(Total) FROM Invoice 
WHERE BillingCountry LIKE "Germany"
GROUP BY CustomerId
HAVING AVG(Total) >10;

    INCorrect

10 - Display the average length of Jazz song (that is, the genre of the song is Jazz) for each album
SELECT Name, AVG(Milliseconds) from Track 
GROUP BY AlbumID
WHERE GenreId.Name LIKE "JAZZ";

    INCorrect