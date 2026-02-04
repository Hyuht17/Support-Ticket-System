<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Http\Requests\CategoryRequest;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService){
        $this->categoryService = $categoryService;
    }

    public function index(){
        $data = $this->categoryService->getAllCategory();
        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function store(CategoryRequest $request){
        $data = $request->validated();
        $category = $this->categoryService->createCategory($data);
        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    public function update(CategoryRequest $request, $id){
        $data = $request->validated();
        $category = $this->categoryService->updateCategory($id, $data);
        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category,
        ]);
    }

    public function destroy($id){
        $deleted = $this->categoryService->deleteCategory($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ]);
    }
}
