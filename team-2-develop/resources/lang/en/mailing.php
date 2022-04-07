<?php
return [
    'reset_url' => config('app.url_client') . '/reset-password',
    'reset_subject' => 'Reset Password Notification',
    'reset_line1' => 'You are receiving this email because we received a password reset request for your account.',
    'reset_line2' => 'This password reset link will expire in :exp minutes.',
    'reset_line3' => 'If you did not request a password reset, no further action is required.',
    'reset_action' => 'Reset Password',
    'request_url' => config('app.url_client') . '/requests/detail/:id',
    'request_subject' => 'Request Notification',
    'request_update_line' => 'Request has an update by :name (:role)',
    'request_comment_line' => 'Request has a new comment by :name (:role)',
    'request_create_line' => 'A request has been created by :name (:role)',
    'request_approve_line' => 'Request has been approved by :name (:role)',
    'request_reject_line' => 'Request has been rejected by :name (:role)',
    'request_info_line1' => 'Title: :title',
    'request_info_line2' => 'Status: :status | Assignee: :assignee',
    'request_view' => 'View Request',
    'verify_url' => config('app.url_client') . '/auth/email/verify?id=:id&hash=:hash',
    'verify_subject' => 'Verify Email Address',
    'verify_line1' => 'Please click the button below to verify your email address.',
    'verify_line2' => 'If you did not create an account, no further action is required.'
];
