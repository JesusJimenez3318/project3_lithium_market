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




