ALTER Table tsla
ADD ticker varchar(10)
default 'TSLA';

CREATE TABLE stock_2 (
Ticker varchar(15),
years varchar(20),
adj_close float 
)

insert into stock_2 ( ticker, years, adj_close) 
SELECT distinct 'SQM' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM SQM
group by Ticker, years
UNION 
SELECT distinct 'TSLA' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM TSLA
group by Ticker, years
UNION
SELECT distinct 'ALB' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM ALB
group by Ticker, years
UNION 
SELECT distinct 'GNENF' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM GNENF
group by Ticker, years
UNION 
SELECT distinct 'LTHM' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM LTHM
group by Ticker, years
UNION
SELECT distinct 'MALRY' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM MALRY
group by Ticker, years
UNION 
SELECT distinct 'NIO' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM NIO
group by Ticker, years
UNION
SELECT distinct 'PILBF' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM PILBF
group by Ticker, years
UNION 
SELECT distinct 'LAC' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM LAC
group by Ticker, years
UNION
SELECT distinct 'SGMML' as Ticker, TO_CHAR(DATE, 'YYYY') as years, MAX (adj_close) FROM SGML
group by Ticker, years
order by Ticker, years asc

select * FROM stock_2

-- create table union_pct as (
-- with etc as (
-- select *, lag(adj_close, 1) over(partition by ticker order by date) as next_day
-- from (select * From alb 
-- 	  union all
-- 	  select * From gnenf 
--       union all 
--       select * from lac 
--       union all 
--       select * From lthm 
--       union all  
--       select * From malry 
--       union all 
--       select * from nio 
--       union all   
--       select * From pilbf 
--       union all   
--       select * from sgml 
--       union all 
--       select * From sqm 
--       union all 
--       select * From tsla) as b)

-- select date, open, high, low, close, adj_close, volume, ticker, (next_day - adj_close)/adj_close as pct_change
-- from etc
-- );

-- update union_pct
-- set pct_change = 0
-- where pct_change is null;

create table union_pct as (
with etc as (
select *
from (select * From alb 
	  union all
	  select * From gnenf 
      union all 
      select * from lac 
      union all 
      select * From lthm 
      union all  
      select * From malry 
      union all 
      select * from nio 
      union all   
      select * From pilbf 
      union all   
      select * from sgml 
      union all 
      select * From sqm 
      union all 
      select * From tsla) as b
)

select date, open, high, low, close, adj_close, volume, ticker, (adj_close/first_value)-1 as pct_change
from (
	select *, first_value(adj_close) over(partition by ticker order by date) as first_value
	from etc) as d
);
