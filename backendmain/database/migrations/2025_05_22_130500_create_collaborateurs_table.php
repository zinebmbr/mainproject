<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('collaborateurs', function (Blueprint $table) {
            $table->id('idco');
        $table->string('nom')->nullable();
        $table->string('prenom')->nullable();
        $table->string('cin')->unique();
        $table->enum('sexe', ['Homme', 'Femme']);
        $table->date('daten')->nullable();
        $table->enum('situation', ['Célibataire', 'Marié', 'Divorcé']);
        $table->string('ville')->nullable();
        $table->string('adresse')->nullable();
        $table->string('lieun')->nullable();
        $table->string('numtel')->nullable();
        $table->string('categorie_professionel')->nullable();
        $table->string('nature_emploi')->nullable();
        $table->string('couverture')->nullable();
        $table->integer('ppr')->unique()->nullable();
        $table->date('date_recrutement')->nullable();
        $table->string('service')->nullable();
        $table->boolean('actif')->default(true);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collaborateurs');
    }
};
