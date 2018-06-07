drop table if exists CUST;

/*==============================================================*/
/* Table: CUST                                                  */
/*==============================================================*/
create table CUST
(
   CUST_ID              numeric(10)                    not null,
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
   STATE                char(1)                        not null,
   CREATE_TIME          timestamp                      not null,
   UPDATE_TIME          timestamp                      not null,
   constraint PK_CUST primary key clustered (CUST_ID)
);

insert into CUST(CUST_ID,CUST_CODE,CUST_NAME,STATE,CREATE_TIME,UPDATE_TIME) values(1,'admin','admin','A',now(),now());




if exists(select 1 from sys.sysforeignkey where role='FK_STAFF_REFERENCE_CUST') then
    alter table STAFF
       delete foreign key FK_STAFF_REFERENCE_CUST
end if;

drop table if exists STAFF;

/*==============================================================*/
/* Table: STAFF                                                 */
/*==============================================================*/
create table STAFF
(
   STAFF_ID             numeric(10)                    not null,
   CUST_ID              numeric(10)                    null,
   STAFF_NAME           varchar(60)                    not null,
   STAFF_CODE           varchar(60)                    not null,
   PASSWORD             varchar(60)                    not null,
   STAFF_ROLE           varchar(60)                    not null,
   AUTH_CODE_C          varchar(60)                    null,
   AUTH_CODE_S          varchar(60)                    null,
   IS_AUTH_PASS         char(1)                        null,
   HOME_PAGE            varchar(60)                    null,
   STATE                char(1)                        not null,
   CREATE_TIME          timestamp                      not null,
   UPDATE_TIME          timestamp                      not null,
   constraint PK_STAFF primary key clustered (STAFF_ID)
);

alter table STAFF
   add constraint FK_STAFF_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;


insert into STAFF(STAFF_ID,CUST_ID,STAFF_NAME,STAFF_CODE,PASSWORD,STAFF_ROLE,STATE,CREATE_TIME,UPDATE_TIME)  values(1,1,'admin','admin','123456','0','A',now(),now());


if exists(select 1 from sys.sysforeignkey where role='FK_CUSTOMER_REFERENCE_CUST') then
    alter table CUSTOMER
       delete foreign key FK_CUSTOMER_REFERENCE_CUST
end if;

drop table if exists CUSTOMER;

/*==============================================================*/
/* Table: CUSTOMER                                              */
/*==============================================================*/
create table CUSTOMER
(
   CUSTOMER_ID          numeric(10)                    not null,
   CUST_ID              numeric(10)                    not null,
   CUSTOMER_NAME        varchar(60)                    not null,
   CUSTOMER_SHORT_NAME  varchar(60)                    not null,
   CUSTOMER_CODE        varchar(60)                    not null,
   ACCEPTOR             varchar(60)                    null,
   PHONE                varchar(60)                    null,
   ADDRESS              varchar(255)                   null,
   STATE                char(1)                        not null,
   CREATE_TIME          timestamp                      not null,
   UPDATE_TIME          timestamp                      not null,
   constraint PK_CUSTOMER primary key clustered (CUSTOMER_ID)
);

alter table CUSTOMER
   add constraint FK_CUSTOMER_REFERENCE_CUST foreign key (CUST_ID)
      references CUST (CUST_ID)
      on update restrict
      on delete restrict;