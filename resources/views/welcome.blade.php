<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>MY PORTFOLIO</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

  </head>
  <body>
    <div id="root"></div>
    <!-- React App -->
    <script src="{{ mix('js/app.js') }}"></script>
  </body>
</html>
