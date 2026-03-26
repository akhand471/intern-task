<?php

namespace App\Controllers;

use App\Models\AuthUser;
use App\Models\Teacher;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class Auth extends ResourceController
{
    private $key = "super_secret_intern_task_key_for_jwt_auth_2026"; 

    public function register()
    {
        $rules = [
            'email' => 'required|valid_email|is_unique[auth_user.email]',
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => 'required|min_length[6]',
            'university_name' => 'required',
            'gender' => 'required|in_list[Male,Female,Other]',
            'year_joined' => 'required|integer',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = \Config\Database::connect();
        $db->transStart();

        $userModel = new AuthUser();
        $teacherModel = new Teacher();

        $userId = $userModel->insert([
            'email'      => $this->request->getVar('email'),
            'first_name' => $this->request->getVar('first_name'),
            'last_name'  => $this->request->getVar('last_name'),
            'password'   => (string)$this->request->getVar('password'),
        ]);

        if ($userId) {
            $teacherModel->insert([
                'user_id'         => $userId,
                'university_name' => $this->request->getVar('university_name'),
                'gender'          => $this->request->getVar('gender'),
                'year_joined'     => $this->request->getVar('year_joined'),
            ]);
        }

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->failServerError('Failed to register user.');
        }

        return $this->respondCreated(['message' => 'User registered successfully.']);
    }

    public function login()
    {
        $rules = [
            'email' => 'required|valid_email',
            'password' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $userModel = new AuthUser();
        $user = $userModel->where('email', $this->request->getVar('email'))->first();

        if (!$user || !password_verify((string)$this->request->getVar('password'), $user['password'])) {
            return $this->failUnauthorized('Invalid email or password');
        }

        $payload = [
            'iss' => "localhost",
            'aud' => "localhost",
            'iat' => time(),
            'exp' => time() + 3600, // 1 hour expiration
            'uid' => $user['id'],
            'email' => $user['email']
        ];

        $token = JWT::encode($payload, $this->key, 'HS256');

        return $this->respond(['message' => 'Login successful', 'token' => $token]);
    }
}
