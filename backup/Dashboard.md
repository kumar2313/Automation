Directories Required
======================

cd /fmriskS/data/SIT1/venture
mkdir support_dir
cd support_dir
mkdir refreshscripts
cd refreshscripts
mkdir initialDBsetup
mkdir refresh5min
mkdir DBINUSE

Note: Copy files in the respective directories 


Refresh Script
================

/fmriskS/data/SIT1/venture/support_dir/refreshscripts/
 |
 ------> refresh5min
            |
            ---------->
                        mainscript.sh
                        deldatabeforeloading.sql (shouls be executed before loading)
                        feedloadingwithSLA.sql
                        feedloadingwithSLAdetails.sql
                        reporting_job_status.sql
                        reporting_job_failure.sql
                        rolledbooksbyfileid.sql
                        rolledbooksbyfileiddetails.sql
                        missing_risk_type.sql
                        finalexecution.sql (should be executed at the end of all sql)
--------> initialDBsetup
            |
            ------------>
                        initialDBcreation.sql (this will be executed once to create the tables required below are the table creation script)

DB Creation steps
===================

Create DB
sqlite3 dev.db < /fmriskS/data/SIT1/venture/support_dir/refreshscripts/initialDBsetup/initialDBcreation.sql

Nodejs Env setup
=================
/fmriskS/data/SIT1/venture/support_dir/node-v16.13.0-linux-x64/bin
export PATH=/fmriskS/data/SIT1/venture/support_dir/node-v16.13.0-linux-x64/bin:$PATH

DB Scripts
==============


CREATE TABLE feed_loading_data (
	business_date TEXT NULL,
	batch_name TEXT NULL,
	instance INTEGER NULL,
	status TEXT NULL,
	count INTEGER NULL,
	total_current  INTEGER NULL,
	total_previous INTEGER NULL,
	percent INTEGER NULL,
	last_lad_hr  INTEGER NULL,
	SLA  INTEGER NULL,
	state TEXT NULL
);

CREATE TABLE feed_loading_data_details (
business_date TEXT NULL,
instance TEXT NULL,
batch_name TEXT NULL,
job TEXT NULL,
params TEXT NULL,
file_id TEXT NULL,
created_time TEXT NULL,
file TEXT NULL,
submitted_time TEXT NULL,
completed_time TEXT NULL,
status TEXT NULL,
pp_engine TEXT NULL,
xfer_engine TEXT NULL,
pp_start_time TEXT NULL,
pp_end_time TEXT NULL,
xfer_start_time TEXT NULL,
xfer_end_time TEXT NULL
);

CREATE TABLE reporting_job_status (
business_date TEXT NULL,
instance_type TEXT NULL,
description TEXT NULL,
instance INTEGER NULL,
status TEXT NULL,
cnt INTEGER NULL,
user_id INTEGER NULL,
curinstance INTEGER NULL,
previnstance INTEGER NULL,
curcnt INTEGER NULL,
prevcont INTEGER NULL,
mxt INTEGER NULL,
instancesla INTEGER NULL,
SLA INTEGER NULL,
State TEXT NULL,
perc INTEGER NULL
);

CREATE TABLE reporting_job_failure (
business_date TEXT NULL,
job_id TEXT NULL,
id TEXT NULL,
stream_id TEXT NULL,
status TEXT NULL,
pid TEXT NULL,
instance INTEGER NULL,
run_order TEXT NULL,
created_time TEXT NULL,
started_time TEXT NULL,
distributed_time TEXT NULL,
no_lines TEXT NULL,
engine TEXT NULL,
version TEXT NULL,
id2 TEXT NULL,
id3 TEXT NULL
);

