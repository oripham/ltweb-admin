import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateOrUpdatePermissionService } from '../../services/RoleService';

interface EditPermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    permission: any | null;
    onPermissionUpdated: () => void;
}

const EditPermissionModal: React.FC<EditPermissionModalProps> = ({ isOpen, onClose, permission, onPermissionUpdated }) => {
    const [permissionName, setPermissionName] = useState('');
    const [permissionDesc, setPermissionDesc] = useState('');

    useEffect(() => {
        if (permission) {
            setPermissionName(permission.name);
            setPermissionDesc(permission.description);
        }
    }, [permission]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validation
        if (!permission) {
            return;
        }
        // Validation 
        if (!permissionName) {
            toast.error('Permission name is required');
            return;
        }
        if (!permissionDesc) {
            toast.error('Permission description is required');
            return;
        }

        try {
            const permissionDateUpdate = {
                permissionId: permission?.permissionId,
                name: permissionName,
                description: permissionDesc,
                rolePermissions: []
            };
            const response = await CreateOrUpdatePermissionService(permissionDateUpdate);
            if (response.success) {
                toast.success(response.message);
                onPermissionUpdated();
                onClose();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error updating permission:', error);
        }
    };

    return (
        <>
            {isOpen && <div className="modal-backdrop fade show"></div>}
            <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex={-1} style={{ display: isOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered modal-simple">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                            <h4 className="mb-2">Edit Permission</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Permission Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={permissionName}
                                        onChange={(e) => setPermissionName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Permission Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={permissionDesc}
                                        onChange={(e) => setPermissionDesc(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary mx-2">Save Changes</button>
                                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPermissionModal;
