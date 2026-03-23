<?php

use Illuminate\Support\Facades\Route;
use App\Actions\Fortify\CreateNewUser;
use App\Http\Controllers\UsersController;
use Illuminate\Validation\ValidationException;

Route::inertia('/', 'welcome', [
    'canRegister' => false, // Disable public registration
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('register', 'auth/register')->name('register');
    Route::post('register', function (CreateNewUser $createNewUser) {
        try {
            $user = $createNewUser->create(request()->all());
            return redirect()->route('dashboard')->with('status', 'Member created successfully: ' . $user->name);
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        }
    })->name('register.store');
    Route::resource('users', UsersController::class);
});

require __DIR__ . '/settings.php';
