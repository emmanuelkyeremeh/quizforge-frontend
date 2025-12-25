import { useCallback, useState } from 'react';
import { Upload, File, X, FileText, FileSpreadsheet } from 'lucide-react';
import Button from '../ui/Button.jsx';
import toast from 'react-hot-toast';

export default function FileDropzone({ onFileSelect, maxFiles = 5 }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file) => {
    const validTypes = ['.pdf', '.docx'];
    const isValidType = validTypes.some(type => file.name.toLowerCase().endsWith(type));
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
    
    if (!isValidType) {
      toast.error(`${file.name} is not a valid file type. Only PDF and DOCX are supported.`);
      return false;
    }
    if (!isValidSize) {
      toast.error(`${file.name} is too large. Maximum file size is 10MB.`);
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length === 0) return;
    
    const currentCount = selectedFiles.length;
    const remainingSlots = maxFiles - currentCount;
    
    if (validFiles.length > remainingSlots) {
      toast.error(`You can only upload ${remainingSlots} more file(s). Maximum ${maxFiles} files allowed.`);
      const filesToAdd = validFiles.slice(0, remainingSlots);
      const newFiles = [...selectedFiles, ...filesToAdd];
      setSelectedFiles(newFiles);
      onFileSelect(newFiles);
    } else {
      const newFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(newFiles);
      onFileSelect(newFiles);
    }
  }, [onFileSelect, selectedFiles, maxFiles]);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length === 0) return;
    
    const currentCount = selectedFiles.length;
    const remainingSlots = maxFiles - currentCount;
    
    if (validFiles.length > remainingSlots) {
      toast.error(`You can only upload ${remainingSlots} more file(s). Maximum ${maxFiles} files allowed.`);
      const filesToAdd = validFiles.slice(0, remainingSlots);
      const newFiles = [...selectedFiles, ...filesToAdd];
      setSelectedFiles(newFiles);
      onFileSelect(newFiles);
    } else {
      const newFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(newFiles);
      onFileSelect(newFiles);
    }
    
    // Reset input
    e.target.value = '';
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles.length > 0 ? newFiles : null);
  };

  const canAddMore = selectedFiles.length < maxFiles;

  return (
    <div>
      {selectedFiles.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
            ${isDragging 
              ? 'border-primary bg-primary-subtle' 
              : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover'}
          `}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-subtle to-primary/5 flex items-center justify-center mx-auto mb-5 border border-primary/10">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <p className="text-base font-medium text-text-primary mb-1.5">
            Drop your files here, or click to browse
          </p>
          <p className="text-sm text-text-tertiary mb-4">
            PDF or DOCX files (max 10MB each, up to {maxFiles} files)
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="px-2 py-1 text-xs font-medium text-text-tertiary bg-bg-tertiary rounded">PDF</span>
            <span className="px-2 py-1 text-xs font-medium text-text-tertiary bg-bg-tertiary rounded">DOCX</span>
          </div>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.docx"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {selectedFiles.map((file, index) => {
            const FileIcon = file.name.endsWith('.pdf') ? FileText : FileSpreadsheet;
            return (
              <div key={index} className="card p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-subtle to-primary/5 flex items-center justify-center border border-primary/10">
                    <FileIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{file.name}</p>
                    <p className="text-xs text-text-tertiary">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
          
          {canAddMore && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer
                ${isDragging 
                  ? 'border-primary bg-primary-subtle' 
                  : 'border-border bg-surface hover:border-border-hover hover:bg-surface-hover'}
              `}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <Upload className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-text-primary mb-1">
                Add more files ({selectedFiles.length}/{maxFiles})
              </p>
              <p className="text-xs text-text-tertiary">
                Drop files or click to browse
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
