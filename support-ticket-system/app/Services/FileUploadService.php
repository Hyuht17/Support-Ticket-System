<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{

    protected $disk;
    protected $storageDisk;
    public function __construct()
    {
        $this->disk = 'r2';
        $this->storageDisk = Storage::disk($this->disk); 
    }
    public function upload(UploadedFile $file, $folder = 'uploads'): array
    {
        $originalName = $file->getClientOriginalName();
        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs($folder, $fileName, [
            'disk' => $this->disk,
           // 'visibility' => 'public',
        ]);

        return [
            'path' => $path,
            'original_name' => $originalName,
            'size' => $file->getSize(),
        ];
    }

    public function uploadMultiple(array $files, $folder = 'uploads'): array
    {
        $filesMetadata = [];
        foreach ($files as $file) {
            $filesMetadata[] = $this->upload($file, $folder, $this->disk);
        }
        return $filesMetadata;
    }

    public function delete(string $path): void
    {
        if ($this->storageDisk->exists($path)) {
            $this->storageDisk->delete($path);
        }
    }
    
    public function getUrl(string $path, string $disk = 'r2'): string
    {
        return $this->storageDisk->url($path);
    }
}