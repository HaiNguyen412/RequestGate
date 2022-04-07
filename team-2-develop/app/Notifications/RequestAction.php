<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class RequestAction extends Notification implements ShouldQueue
{
    use Queueable;
    public $data;
    public $action;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data, $action)
    {
        $this->data = $data;
        $this->action = $action;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = __('mailing.request_url', ['id' => $this->data['request_id']]);

        $mail = (new MailMessage())
                ->subject(__('mailing.request_subject'))
                ->line(__('mailing.request_' . $this->action . '_line', [
                    'name' => $this->data['name'],
                    'role' => $this->data['role'],
                ]))
                ->line(__('mailing.request_info_line1', [
                    'title' => $this->data['request_title'],
                ]))
                ->line(__('mailing.request_info_line2', [
                    'status' => $this->data['request_status'],
                    'assignee' => $this->data['assignee'],
                ]))
                ->line('');

        if (isset($this->data['content'])) {
            foreach (explode(' ; ', $this->data['content']) as $content) {
                $mail = $mail->line($content);
            }
        }

        $mail = $mail->action(__('mailing.request_view'), $url);

        return $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
