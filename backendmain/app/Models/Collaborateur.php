<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaborateur extends Model
{
    use HasFactory;
     // If your PK column is non-standard:
     protected $primaryKey = 'idco';

     // Which columns you want mass-assignable:
     protected $fillable = [
         'nom', 'prenom', 'cin', 'sexe', 'daten',
         'situation', 'ville', 'adresse', 'lieun',
         'numtel','categorie_professionel','nature_emploi',
         'couverture','ppr','date_recrutement','service','actif'
     ];
 
}
