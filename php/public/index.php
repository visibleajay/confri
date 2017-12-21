<?php
    $servername = "localhost";
    $username = "testuser";
    $password = "password";
    $dbname = "testdb";

    try {

        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO customers (first_name, last_name)
        VALUES ('$_POST[fname]', '$_POST[lname]')";
        
        // use exec() because no results are returned
        $conn->exec($sql);
        echo "New record created successfully";
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;
?>