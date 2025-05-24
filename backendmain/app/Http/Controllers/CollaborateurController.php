<?php

namespace App\Http\Controllers;

use App\Models\Collaborateur;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;

class CollaborateurController extends Controller
{
    /**
     * Display a listing of active collaborateurs
     */
    public function index(): JsonResponse
    {
        $cols = Collaborateur::where('actif', true)
            ->orderBy('nom')
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $cols
        ]);
    }

    /**
     * Store a newly created collaborateur
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'cin' => 'required|string|unique:collaborateurs,cin|max:255',
            'sexe' => 'required|in:Homme,Femme',
            'daten' => 'nullable|date',
            'situation' => 'required|in:Célibataire,Marié,Divorcé',
            'ville' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:500',
            'lieun' => 'nullable|string|max:255',
            'numtel' => 'nullable|string|max:20',
            'categorie_professionel' => 'nullable|string|max:255',
            'nature_emploi' => 'nullable|string|max:255',
            'couverture' => 'nullable|string|max:255',
            'ppr' => 'nullable|integer|unique:collaborateurs,ppr',
            'date_recrutement' => 'nullable|date',
            'service' => 'nullable|string|max:255',
            'actif' => 'boolean'
        ]);

        try {
            $collaborateur = Collaborateur::create($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Collaborateur créé avec succès',
                'data' => $collaborateur
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du collaborateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified collaborateur
     */
    public function show($id): JsonResponse
    {
        $collaborateur = Collaborateur::find($id);
        
        if (!$collaborateur) {
            return response()->json([
                'success' => false,
                'message' => 'Collaborateur non trouvé'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $collaborateur
        ]);
    }

    /**
     * Update the specified collaborateur
     */
    public function update(Request $request, $id): JsonResponse
    {
        $collaborateur = Collaborateur::find($id);
        
        if (!$collaborateur) {
            return response()->json([
                'success' => false,
                'message' => 'Collaborateur non trouvé'
            ], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'cin' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('collaborateurs')->ignore($collaborateur->idco, 'idco')
            ],
            'sexe' => 'sometimes|required|in:Homme,Femme',
            'daten' => 'nullable|date',
            'situation' => 'sometimes|required|in:Célibataire,Marié,Divorcé',
            'ville' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:500',
            'lieun' => 'nullable|string|max:255',
            'numtel' => 'nullable|string|max:20',
            'categorie_professionel' => 'nullable|string|max:255',
            'nature_emploi' => 'nullable|string|max:255',
            'couverture' => 'nullable|string|max:255',
            'ppr' => [
                'nullable',
                'integer',
                Rule::unique('collaborateurs')->ignore($collaborateur->idco, 'idco')
            ],
            'date_recrutement' => 'nullable|date',
            'service' => 'nullable|string|max:255',
            'actif' => 'boolean'
        ]);

        try {
            $collaborateur->update($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'Collaborateur mis à jour avec succès',
                'data' => $collaborateur->fresh()
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du collaborateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified collaborateur (soft delete by setting actif to false)
     */
    public function destroy($id): JsonResponse
    {
        $collaborateur = Collaborateur::find($id);
        
        if (!$collaborateur) {
            return response()->json([
                'success' => false,
                'message' => 'Collaborateur non trouvé'
            ], 404);
        }

        try {
            // Soft delete by setting actif to false
            $collaborateur->update(['actif' => false]);
            
            return response()->json([
                'success' => true,
                'message' => 'Collaborateur désactivé avec succès'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la désactivation du collaborateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}