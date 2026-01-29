<?php

namespace App\Services;

use App\Repositories\LabelRepository;

class LabelService{
    protected $labelRepository;

    public function __construct(LabelRepository $labelRepository){
        $this->labelRepository = $labelRepository;
    }

    public function getAllLabel(){
        return $this->labelRepository->all();
    }

    public function createLabel($data){
        return $this->labelRepository->create($data);
    }

    public function updateLabel($id, $data){
        return $this->labelRepository->update($id, $data);
    }

    public function deleteLabel($id){
        return $this->labelRepository->delete($id);
    }
}