<?php

namespace App\Repositories;

use App\Models\Category;
use Exception;

class CategoryRepository{
    public function all(){
        return Category::all();
    }

    public function find($id){
        return Category::find($id);
    }

    public function create($data){
        $name = $data['name'];
        $category = Category::withTrashed()->where('name', $name)->first();
        if($category){
            if($category->trashed()){
                $category->restore();
                return $category;
            }
        }
        return Category::create($data);
    }

    public function update($id, $data){
        $category = $this->find($id);
        if($category){
            $category->update($data);
            return $category;
        }
        return null;
    }

    public function delete($id){
        $category = $this->find($id);
        if($category){
            return $category->delete();
        }
        return false;
    }
}