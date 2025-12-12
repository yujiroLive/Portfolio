<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @php
      try {
        $csrfToken = csrf_token();
      } catch (\Exception $e) {
        $csrfToken = '';
      }
    @endphp
    <meta name="csrf-token" content="{{ $csrfToken }}">
    <title>MY PORTFOLIO</title>
    @php
      try {
        $cssPath = mix('css/app.css');
      } catch (\Exception $e) {
        $cssPath = '/css/app.css';
      }
    @endphp
    <link rel="stylesheet" href="{{ $cssPath }}">

  </head>
  <body>
    <div id="root"></div>
    <!-- React App -->
    @php
      try {
        $jsPath = mix('js/app.js');
      } catch (\Exception $e) {
        $jsPath = '/js/app.js';
      }
    @endphp
    <script src="{{ $jsPath }}"></script>
  </body>
</html>
