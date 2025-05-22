<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Collaborateur>
 */
class CollaborateurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom'                     => $this->faker->lastName,
            'prenom'                  => $this->faker->firstName,
            'cin'                     => strtoupper($this->faker->bothify('??######')),
            'sexe'                    => $this->faker->randomElement(['Homme','Femme']),
            'daten'                   => $this->faker->date(),
            'situation'               => $this->faker->randomElement(['Célibataire','Marié','Divorcé']),
            'ville'                   => $this->faker->city,
            'adresse'                 => $this->faker->streetAddress,
            'lieun'                   => $this->faker->city,
            'numtel'                  => $this->faker->phoneNumber,
            'categorie_professionel'  => $this->faker->jobTitle,
            'nature_emploi'           => $this->faker->randomElement(['CDI','CDD','Intérim','Stage']),
            'couverture'              => $this->faker->randomElement(['CNSS','AMO','Privé','Aucune']),
            'ppr'                     => $this->faker->unique()->numberBetween(1000,9999),
            'date_recrutement'        => $this->faker->date(),
            'service'                 => $this->faker->word,
        ];
    }
}
