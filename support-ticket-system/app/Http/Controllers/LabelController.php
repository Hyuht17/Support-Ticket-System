<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LabelService;
use App\Http\Requests\LabelRequest;

class LabelController extends Controller
{
    protected $labelService;

    public function __construct(LabelService $labelService){
        $this->labelService = $labelService;
    }

    public function index(){
        $data = $this->labelService->getAllLabel();
        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function store(LabelRequest $request){
        $data = $request->validated();
        $label = $this->labelService->createLabel($data);
        return response()->json([
            'success' => true,
            'message' => 'Label created successfully',
            'data' => $label,
        ], 201);
    }

    public function update(LabelRequest $request, $id){
        $data = $request->validated();
        $label = $this->labelService->updateLabel($id, $data);
        return response()->json([
            'success' => true,
            'message' => 'Label updated successfully',
            'data' => $label,
        ]);
    }

    public function destroy($id){
        $deleted = $this->labelService->deleteLabel($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Label deleted successfully',
        ]);
    }
}
