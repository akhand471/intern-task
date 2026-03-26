<?php

namespace App\Controllers;

use App\Models\AuthUser;
use App\Models\Teacher;
use CodeIgniter\RESTful\ResourceController;

class Api extends ResourceController
{
    public function users()
    {
        $model = new AuthUser();
        // Don't send passwords over API
        $users = $model->select('id, email, first_name, last_name, created_at')->findAll();
        return $this->respond($users);
    }

    public function teachers()
    {
        $model = new Teacher();
        // Join to get full user details in the teachers API as an added bonus
        $db = \Config\Database::connect();
        $builder = $db->table('teachers');
        $builder->select('teachers.id, teachers.university_name, teachers.gender, teachers.year_joined, auth_user.first_name, auth_user.last_name, auth_user.email');
        $builder->join('auth_user', 'auth_user.id = teachers.user_id');
        $teachers = $builder->get()->getResult();

        return $this->respond($teachers);
    }
}
