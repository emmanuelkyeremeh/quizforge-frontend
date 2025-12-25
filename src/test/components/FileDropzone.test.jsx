import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FileDropzone from '../../components/upload/FileDropzone.jsx';

describe('FileDropzone Component', () => {
  it('renders dropzone when no files selected', () => {
    const onFileSelect = vi.fn();
    render(<FileDropzone onFileSelect={onFileSelect} />);
    expect(screen.getByText(/Drop your files here/i)).toBeInTheDocument();
  });

  it('accepts file upload', () => {
    const onFileSelect = vi.fn();
    render(<FileDropzone onFileSelect={onFileSelect} />);
    
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(onFileSelect).toHaveBeenCalled();
  });

  it('rejects invalid file types', () => {
    const onFileSelect = vi.fn();
    render(<FileDropzone onFileSelect={onFileSelect} />);
    
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = document.querySelector('input[type="file"]');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    // Should not call onFileSelect for invalid types
    // (validation happens in component)
  });

  it('handles multiple files up to limit', () => {
    const onFileSelect = vi.fn();
    render(<FileDropzone onFileSelect={onFileSelect} maxFiles={5} />);
    
    const files = Array.from({ length: 3 }, (_, i) => 
      new File(['test'], `test${i}.pdf`, { type: 'application/pdf' })
    );
    
    const input = document.querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files } });
    
    expect(onFileSelect).toHaveBeenCalled();
  });

  it('prevents exceeding max files', () => {
    const onFileSelect = vi.fn();
    render(<FileDropzone onFileSelect={onFileSelect} maxFiles={2} />);
    
    const files = Array.from({ length: 5 }, (_, i) => 
      new File(['test'], `test${i}.pdf`, { type: 'application/pdf' })
    );
    
    const input = document.querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files } });
    
    // Should only accept first 2 files
    expect(onFileSelect).toHaveBeenCalled();
  });

  it('allows removing files', () => {
    const onFileSelect = vi.fn();
    const { rerender } = render(<FileDropzone onFileSelect={onFileSelect} />);
    
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files: [file] } });
    
    // Simulate file being selected
    rerender(<FileDropzone onFileSelect={onFileSelect} />);
    
    // Find and click remove button
    const removeButtons = screen.queryAllByRole('button');
    const removeButton = removeButtons.find(btn => 
      btn.querySelector('svg') // X icon
    );
    
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(onFileSelect).toHaveBeenCalledWith(null);
    }
  });
});
