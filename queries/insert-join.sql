INSERT INTO list ( task, user_id) 
    VALUES ( $1, (SELECT id from users WHERE id = $2) )
    RETURNING id, task;