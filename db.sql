drop table if exists CUST;

/*==============================================================*/
/* Table: CUST                                                  */
/*==============================================================*/
create table CUST
(
   CUST_ID              int(10)                        not null auto_increment,
   CUST_CODE            varchar(60)                    not null,
   CUST_NAME            varchar(60)                    not null,
   CUST_PHONE           varchar(60)                    null,
   CUST_ADDRESS         varchar(60)                    null,
   FAX                  varchar(60)                    null,
   TAX_NUMBER           varchar(60)                    null,
   BANK_NAME            varchar(60)                    null,
   BANK_ACCOUNT         varchar(60)                    null,
   BANK_NUMBER          varchar(60)                    null,
   STORE_HOUSE          varchar(60)                    null,
   PARTNERS             numeric(10)                    null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_CUST primary key clustered (CUST_ID)
);

--insert into CUST(CUST_CODE,CUST_NAME) values('admin','admin');




if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_STAFF_REFERENCE_CUST') then
    alter table STAFF
       delete foreign key FK_STAFF_REFERENCE_CUST
end if;

drop table if exists STAFF;

/*==============================================================*/
/* Table: STAFF                                                 */
/*==============================================================*/
create table STAFF
(
   STAFF_ID             int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   STAFF_NAME           varchar(60)                    not null,
   STAFF_CODE           varchar(60)                    not null unique,
   PASSWORD             varchar(256)                   not null,
   STAFF_ROLE           varchar(60)                    not null DEFAULT 'user',
   AUTH_CODE_C          varchar(60)                    null,
   AUTH_CODE_S          varchar(60)                    null,
   IS_AUTH_PASS         char(1)                        null,
   HOME_PAGE            varchar(60)                    null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_STAFF primary key clustered (STAFF_ID)
);

alter table STAFF
   add constraint FK_STAFF_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;


--insert into STAFF(CUST_ID,STAFF_NAME,STAFF_CODE,PASSWORD,STAFF_ROLE)  values(1,'Admin','admin','09472b87a00588ce898737b10fe1d86fd415097c436cf691ea3db2d42460384c','super_admin');






if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_AUTH_REQ_REFERENCE_CUST') then
    alter table AUTH_REQ
       delete foreign key FK_AUTH_REQ_REFERENCE_CUST
end if;

if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_AUTH_REQ_REFERENCE_STAFF') then
    alter table AUTH_REQ
       delete foreign key FK_AUTH_REQ_REFERENCE_STAFF
end if;

drop table if exists AUTH_REQ;

/*==============================================================*/
/* Table: AUTH_REQ                                                 */
/*==============================================================*/
create table AUTH_REQ
(
   AUTH_REQ_ID          int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   STAFF_ID             int(10)                        not null,
   AUTH_CODE_C          varchar(256)                   not null,
   AUTH_CODE_S          varchar(256)                   not null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_AUTH_REQ primary key clustered (AUTH_REQ_ID)
);

alter table AUTH_REQ
   add constraint FK_AUTH_REQ_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;

alter table AUTH_REQ
   add constraint FK_AUTH_REQ_REFERENCE_STAFF foreign key (STAFF_ID)
      references STAFF (STAFF_ID)
      on update restrict
      on delete restrict;



if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_CUSTOMER_REFERENCE_CUST') then
    alter table CUSTOMER
       delete foreign key FK_CUSTOMER_REFERENCE_CUST
end if;

drop table if exists CUSTOMER;

/*==============================================================*/
/* Table: CUSTOMER                                              */
/*==============================================================*/
create table CUSTOMER
(
   CUSTOMER_ID          int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   CUSTOMER_NAME        varchar(60)                    not null,
   CUSTOMER_SHORT_NAME  varchar(60)                    not null,
   CUSTOMER_CODE        varchar(60)                    not null,
   LINKMAN              varchar(60)                    null,
   PHONE                varchar(60)                    null,
   ADDRESS              varchar(255)                   null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_CUSTOMER primary key clustered (CUSTOMER_ID)
);

alter table CUSTOMER
   add constraint FK_CUSTOMER_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;


drop table if exists STAFF_ROLE;

/*==============================================================*/
/* Table: STAFF_ROLE                                            */
/*==============================================================*/
create table STAFF_ROLE
(
   STAFF_ROLE_CODE      varchar(60)                    not null,
   STAFF_ROLE_NAME      varchar(60)                    not null,
   CUST_ID              int(10)                        not null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_STAFF_ROLE primary key clustered (STAFF_ROLE_CODE)
);

--insert into STAFF_ROLE(STAFF_ROLE_CODE,STAFF_ROLE_NAME) values('admin','管理员');



if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_SUPPLIER_REFERENCE_CUST') then
    alter table SUPPLIER
       delete foreign key FK_SUPPLIER_REFERENCE_CUST
end if;

drop table if exists SUPPLIER;

/*==============================================================*/
/* Table: SUPPLIER                                              */
/*==============================================================*/
create table SUPPLIER
(
   SUPPLIER_ID          int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   SUPPLIER_NAME        varchar(60)                    not null,
   SUPPLIER_SHORT_NAME  varchar(60)                    not null,
   SUPPLIER_CODE        varchar(60)                    not null,
   LINKMAN             varchar(60)                    null,
   PHONE                varchar(60)                    null,
   ADDRESS              varchar(255)                   null,
   FAX                  varchar(60)                    null,
   EMAIL                varchar(60)                    null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_SUPPLIER primary key clustered (SUPPLIER_ID)
);

alter table SUPPLIER
   add constraint FK_SUPPLIER_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;


if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_MATER_TYPE_REFERENCE_CUST') then
    alter table MATER_TYPE
       delete foreign key FK_MATER_TYPE_REFERENCE_CUST
end if;

drop table if exists MATER_TYPE;

/*==============================================================*/
/* Table: MATER_TYPE                                            */
/*==============================================================*/
create table MATER_TYPE
(
   MATER_TYPE_ID        int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   MATER_TYPE_NAME      varchar(60)                    not null,
   PARENT_TYPE_ID       int(10)                        null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_MATER_TYPE primary key clustered (MATER_TYPE_ID)
);

alter table MATER_TYPE
   add constraint FK_MATER_TYPE_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;


if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_MATER_REFERENCE_CUST') then
    alter table MATER
       delete foreign key FK_MATER_REFERENCE_CUST
end if;

if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_MATER_REFERENCE_MATER_TYPE') then
    alter table MATER
       delete foreign key FK_MATER_REFERENCE_MATER_TYPE
end if;

drop table if exists MATER;

/*==============================================================*/
/* Table: MATER                                                 */
/*==============================================================*/
create table MATER
(
   MATER_ID             int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   MATER_TYPE_ID           int(10)                     null,
   MATER_TYPE_NAME      varchar(60)                    null,
   MATER_CODE           varchar(60)                    not null,
   MATER_NAME           varchar(60)                    not null,
   MATER_UNIT           varchar(10)                    not null,
   MATER_NUM            numeric(10)                    null DEFAULT 0,
   MATER_REQ_NUM        numeric(10)                    null DEFAULT 0,
   MATER_HINT_MAX       numeric(10)                    null DEFAULT 0,
   MATER_HINT_MIN       numeric(10)                    null DEFAULT 0,
   MATER_ATTR           varchar(255)                   null,
   MATER_ATTR_EXTEND    varchar(255)                   null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_MATER primary key clustered (MATER_ID)
);

alter table MATER
   add constraint FK_MATER_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;

alter table MATER
   add constraint FK_MATER_REFERENCE_MATER_TYPE foreign key (MATER_TYPE_ID)
      references MATER_TYPE (MATER_TYPE_ID)
      on update restrict
      on delete restrict;



if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_PROD_TYPE_REFERENCE_CUST') then
    alter table PROD_TYPE
       delete foreign key FK_PROD_TYPE_REFERENCE_CUST
end if;


drop table if exists PROD_TYPE;

/*==============================================================*/
/* Table: PROD_TYPE                                            */
/*==============================================================*/
create table PROD_TYPE
(
   PROD_TYPE_ID        int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   PROD_TYPE_NAME      varchar(60)                    not null,
   PARENT_TYPE_ID       int(10)                        null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_PROD_TYPE primary key clustered (PROD_TYPE_ID)
);

alter table PROD_TYPE
   add constraint FK_PROD_TYPE_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;



if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_PROD_REFERENCE_CUST') then
    alter table PROD
       delete foreign key FK_PROD_REFERENCE_CUST
end if;

if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_PROD_REFERENCE_CUSTOMER') then
    alter table PROD
       delete foreign key FK_PROD_REFERENCE_CUSTOMER
end if;

if exists(select 1 from information_schema.KEY_COLUMN_USAGE where CONSTRAINT_NAME='FK_PROD_REFERENCE_PROD_TYPE') then
    alter table PROD
       delete foreign key FK_PROD_REFERENCE_PROD_TYPE
end if;

drop table if exists PROD;

/*==============================================================*/
/* Table: PROD                                                  */
/*==============================================================*/
create table PROD
(
   PROD_ID              int(10)                        not null auto_increment,
   CUST_ID              int(10)                        not null,
   CUSTOMER_ID          int(10)                        null,
   CUSTOMER_NAME        varchar(60)                       null,
   PROD_TYPE_ID         int(10)                        null,
   PROD_TYPE_NAME      varchar(60)                     null,
   PROD_CODE            varchar(60)                    not null,
   PROD_NAME            varchar(60)                    not null,
   PROD_UNIT            varchar(10)                    not null,
   PROD_NUM             numeric(10)                    null DEFAULT 0,
   PROD_PIC             varchar(255)                   null,
   STATE                char(1)                        not null DEFAULT 'A',
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   UPDATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_PROD primary key clustered (PROD_ID)
);

alter table PROD
   add constraint FK_PROD_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;

alter table PROD
   add constraint FK_PROD_REFERENCE_CUSTOMER foreign key (CUSTOMER_ID)
      references CUSTOMER (CUSTOMER_ID)
      on update restrict
      on delete restrict;

alter table PROD
   add constraint FK_PROD_REFERENCE_PROD_TYPE foreign key (PROD_TYPE_ID)
      references PROD_TYPE (PROD_TYPE_ID)
      on update restrict
      on delete restrict;




drop table if exists HANDLER_LOG;

/*==============================================================*/
/* Table: HANDLER_LOG                                           */
/*==============================================================*/
create table HANDLER_LOG
(
   HANDLER_LOG_ID       int(10)                        not null auto_increment,
   CUST_NAME            varchar(60)                        null,
   CUST_CODE            varchar(60)                    null,
   STAFF_NAME           varchar(60)                    null,
   STAFF_CODE           varchar(60)                        null,
   HANDLER_TYPE         varchar(60)                    not null,
   HANDLER_NAME         varchar(60)                    not null,
   HANDLER_HEADER       varchar(4000)                       null,
   HANDLER_BODY         varchar(4000)                       null,
   CREATE_TIME          timestamp                      not null DEFAULT now(),
   constraint PK_HANDLER_LOG primary key clustered (HANDLER_LOG_ID)
);


/*==============================================================*/
/* prod 冗余prodType                                             */
/* mater 冗余materType                                           */
/* prod 冗余customerName                                         */
/*==============================================================*/

