To Kill Browser
$ kill -9 $(lsof -t -i:3000)


Reference : https://github.com/kunxin-chor/tgc12-mysql/blob/master/queries.sql

mysql -u root 

show databases //display all databases in the server

create database employee_feedback;

use employee_feedback;

create table students(
student_id int unsigned auto_increment primary key,
first_name varchar(200) not null,
last_name varchar(200) not null,
bio text
) engine = innodb;
//int can hold 4B 
// <name ofcolumn> <data type> <autoincrease by one> <primary key>
// one column

show tables

insert into students (first_name, last_name, bio) 
values ("Ah Kow", "Tan", "Year one student");
//insert into <table name>(<columns>) (<values>)

select * from students;

insert into students (first_name, last_name) values ("Mary", "Su");

insert into students (first_name, last_name, bio) values 
    ("John", "Doe", "Unknown person"),
    ("Alice", "Tay", null),
    ("Jane", "Smith", "Unknown person from a different era");

Exercise

create database library;

create table courses(
    course_id int unsigned auto_increment primary key, 
    title varchar(200) not null,
    description varchar(200) not null
) engine=innodb;

insert into courses (title, description) values
("Management","Managing people, money and resources"),
("Marketing", "Making your brand known"),
("HR", "Managing people capital"); 


create table professors (
    professor_id int unsigned auto_increment primary key,
    first_name varchar(200) not null,
    last_name varchar(200) not null,
    salutation varchar(200) not null) engine=innodb;

    insert into professors (first_name, last_name, salutation) values
("Peter", "Ang", "Dr"),
("Paul", "Lee", "Asst Prof"),
("Sam","Ang", "Mr")
;

create table feedback_statuses (
    feedback_status_id int unsigned auto_increment primary key, 
    text text not null
) engine = innodb;

Insert into feedback_statuses (text)
values ('Pending'),
('acknowledged'),
('resolved'),
('escalated');

//foreign key 
create table modules (
  module_id int unsigned auto_increment primary key,
  name varchar(200) not null,
  description tinytext not null,
  professor_id int unsigned not null, 
  foreign key(professor_id) references professors(professor_id)) engine=innodb;


//Invalid example
Insert into modules (name, description, professor_id) values
('Interviews 101', 'How to conduct interviews', 2);

//Valid example, bec there is professor_id with 1
Insert into modules (name, description, professor_id) values
('Interviews 101', 'How to conduct interviews', 1);

//Delete 
//only delete student whose id is 4
delete from students where student_id =4;

we cannot delete row where there are other rows dependent on it
eg. delete from professors where professor_id = 1;

//Create classes 
//delete cascade is permanent // it will affect audit trail 
create table classes (
    class_id int unsigned auto_increment primary key, 
    semester varchar(10) not null, 
    course_id int unsigned not null, 
    foreign key(course_id) references courses(course_id) on delete cascade, 
    module_id int unsigned not null, 
    foreign key(module_id) references modules (module_id) on delete cascade
)engine = innodb;


If your project requires foreign key, then you should use SQl. 

Note: internal counter will still go up, even if it is an error 

insert into classes (semester, course_id, module_id) values ("AY2021",3,2);

//rename columns 
alter table classes rename column semester to semester code;

//alter table classes add column new_of_column unsigned int

//Update a Row
update students set bio = "stays in AMK" where student_is =2;






)engine = innodb;
// compulsory = not null

use library;
![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

Welcome PamelaSohWY,

This is the Code Institute student template for Gitpod. We have preinstalled all of the tools you need to get started. You can safely delete this README.md file, or change it for your own project. Please do read it at least once, though! It contains some important information about Gitpod and the extensions we use.

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

To run a backend Python file, type `python3 app.py`, if your Python file is named `app.py` of course.

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

In Gitpod you have superuser security privileges by default. Therefore you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

To log into the Heroku toolbelt CLI:

1. Log in to your Heroku account and go to *Account Settings* in the menu under your avatar.
2. Scroll down to the *API Key* and click *Reveal*
3. Copy the key
4. In Gitpod, from the terminal, run `heroku_config`
5. Paste in your API key when asked

You can now use the `heroku` CLI program - try running `heroku apps` to confirm it works. This API key is unique and private to you so do not share it. If you accidently make it public then you can create a new one with _Regenerate API Key_.

## Updates Since The Instructional Video

We continually tweak and adjust this template to help give you the best experience. Here is the version history:

**May 10 2021:** Added `heroku_config` script to allow Heroku API key to be stored as an environment variable.

**April 7 2021:** Upgraded the template for VS Code instead of Theia.

**October 21 2020:** Versions of the HTMLHint, Prettier, Bootstrap4 CDN and Auto Close extensions updated. The Python extension needs to stay the same version for now.

**October 08 2020:** Additional large Gitpod files (`core.mongo*` and `core.python*`) are now hidden in the Explorer, and have been added to the `.gitignore` by default.

**September 22 2020:** Gitpod occasionally creates large `core.Microsoft` files. These are now hidden in the Explorer. A `.gitignore` file has been created to make sure these files will not be committed, along with other common files.

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

---

Happy coding!
