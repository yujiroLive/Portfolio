<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->get();
        
        return response()->json($posts);
    }

    /**
     * Store a newly created post in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $post = Post::create([
            'name' => $request->name,
            'message' => $request->message,
        ]);

        return response()->json($post, 201);
    }
}

