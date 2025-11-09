<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
    /**
     * Handle contact form submission and send email.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            // Send email to your contact address
            Mail::to('yuji.jiro21@gmail.com')->send(new ContactMail(
                $request->name,
                $request->email,
                $request->message
            ));

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message! I will get back to you soon.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, there was an error sending your message. Please try again later.'
            ], 500);
        }
    }
}

