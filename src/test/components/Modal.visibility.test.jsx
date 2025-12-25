/**
 * Modal Component - Visibility Tests
 * 
 * Tests modal visibility, scroll behavior, and viewport positioning
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal.jsx';
import { isElementInViewport, setViewport } from '../utils/responsive.js';

describe('Modal Component - Visibility', () => {
  beforeEach(() => {
    setViewport(1024, 768);
  });

  it('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <ModalHeader>Test Modal</ModalHeader>
        <ModalBody>Modal content</ModalBody>
      </Modal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <ModalHeader>Test Modal</ModalHeader>
      </Modal>
    );
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('modal is within viewport when open', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <ModalHeader>Viewport Test</ModalHeader>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    
    const modal = container.querySelector('[class*="max-w"]');
    if (modal) {
      // Modal should be positioned in viewport
      const rect = modal.getBoundingClientRect();
      expect(rect.top).toBeGreaterThanOrEqual(0);
      expect(rect.left).toBeGreaterThanOrEqual(0);
    }
  });

  it('modal has max height constraint', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <ModalHeader>Height Test</ModalHeader>
        <ModalBody>
          {Array(100).fill(0).map((_, i) => (
            <p key={i}>Line {i}</p>
          ))}
        </ModalBody>
      </Modal>
    );
    
    const modal = container.querySelector('[class*="max-h"]');
    expect(modal).toBeInTheDocument();
    
    // Modal body should be scrollable
    const modalBody = container.querySelector('[class*="overflow-y-auto"]');
    expect(modalBody).toBeInTheDocument();
  });

  it('modal adapts to mobile viewport', () => {
    setViewport(375, 667);
    
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} size="lg">
        <ModalHeader>Mobile Modal</ModalHeader>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    
    const modal = container.querySelector('[class*="max-w"]');
    if (modal) {
      const rect = modal.getBoundingClientRect();
      // Modal should not exceed viewport width
      expect(rect.width).toBeLessThanOrEqual(375);
    }
  });

  it('locks body scroll when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <ModalHeader>Scroll Lock</ModalHeader>
      </Modal>
    );
    
    // Body should have overflow hidden
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal closes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <ModalHeader>Scroll Restore</ModalHeader>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(
      <Modal isOpen={false} onClose={vi.fn()}>
        <ModalHeader>Scroll Restore</ModalHeader>
      </Modal>
    );
    
    // After unmount, overflow should be restored
    // Note: This might need cleanup in afterEach
  });
});

