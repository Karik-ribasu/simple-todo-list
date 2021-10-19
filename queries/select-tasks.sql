SELECT list.id, list.task
    FROM list JOIN users ON list.user_id = users.id 
    WHERE users.id = $1