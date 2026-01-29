<?php

namespace App\Repositories;

use App\Models\Label;
use Exception;

class LabelRepository{
    public function all(){
        return Label::all();
    }

    public function find($id){
        return Label::find($id);
    }

    public function create($data){
        $name = $data['name'];
        $label = Label::withTrashed()->where('name', $name)->first();
        if($label){
            if($label->trashed()){
                $label->restore();
                return $label;
            }
        }
        return Label::create($data);
    }

    public function update($id, $data){
        $label = $this->find($id);
        if($label){
            $label->update($data);
            return $label;
        }
        return null;
    }

    public function delete($id){
        $label = $this->find($id);
        if($label){
            return $label->delete();
        }
        return false;
    }
}