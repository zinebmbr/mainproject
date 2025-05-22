<?php

namespace App\Http\Controllers;

use App\Models\Collaborateur;
use Illuminate\Http\Request;

class CollaborateurController extends Controller
{
    public function index()
    {
        // return all actifs, ordered by nom
        $cols = Collaborateur::where('actif', true)
                             ->orderBy('nom')
                             ->get();

        return response()->json($cols);
    }
}