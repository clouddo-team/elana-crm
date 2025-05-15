INSERT INTO deal (
    eurosys_id,
    date,
    settlement,
    status,
    order_type,
    code,
    currency,
    number,
    unit_price,
    total,
    platform
)
SELECT 
    n.eurosys_id,
    DATE_SUB(CURRENT_DATE(), INTERVAL FLOOR(RAND() * 30) DAY) as date,
    DATE_ADD(CURRENT_DATE(), INTERVAL FLOOR(RAND() * 30) DAY) as settlement,
    CASE FLOOR(RAND() * 2) 
        WHEN 0 THEN 'VALIDATED' 
        ELSE 'NOT_VALIDATED' 
    END as status,
    CASE FLOOR(RAND() * 2) 
        WHEN 0 THEN 'BUY' 
        ELSE 'SELL' 
    END as order_type,
    CONCAT('STOCK', LPAD(FLOOR(RAND() * 1000), 3, '0')) as code,
    CASE FLOOR(RAND() * 3) 
        WHEN 0 THEN 'USD' 
        WHEN 1 THEN 'EUR' 
        ELSE 'GBP' 
    END as currency,
    FLOOR(RAND() * 1000) + 1 as number,
    ROUND(RAND() * 1000 + 10, 2) as unit_price,
    ROUND(RAND() * 1000000 + 10000, 2) as total,
    CASE FLOOR(RAND() * 3) 
        WHEN 0 THEN 'NYSE' 
        WHEN 1 THEN 'NASDAQ' 
        ELSE 'LSE' 
    END as platform
FROM (
    SELECT 1 as eurosys_id UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
    UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
    UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
) n; 