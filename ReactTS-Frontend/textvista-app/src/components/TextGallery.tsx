import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { Worker, Viewer } from '@react-pdf-viewer/core';
//import '@react-pdf-viewer/core/lib/styles/index.css';

export const TextGallery: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();


    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const allowedFileTypes = ['text/plain', 'application/pdf'];

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;

        if (selectedFile) {
            const error = validateFile(selectedFile);
            if (error) {
                setError(error);
                setFile(null);
                setFileContent(null);
            } else {
                setError(null);
                setFile(selectedFile);
                readFileContent(selectedFile);
            }
        }
    };

    const validateFile = (file: File): string | null => {
        if (!allowedFileTypes.includes(file.type)) {
            return 'Invalid file type. Only .txt and .pdf files are allowed.';
        }
        if (file.size > maxFileSize) {
            return 'File size exceeds the 5MB limit.';
        }
        return null;
    };

    const readFileContent = (file: File) => {
        const reader = new FileReader();

        if (file.type === 'text/plain') {
            reader.onload = () => {
                setFileContent(reader.result);
            };
            reader.readAsText(file);
        } else if (file.type === 'application/pdf') {
            // For PDFs, we read the file as a data URL
            reader.onload = () => {
                setFileContent(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const url = `http://localhost:8080/api/uploadFile`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);

        try {
            setError(null);
            await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } catch (uploadError: any) {
            setError(uploadError.message);
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h1>File Upload and Display</h1>
                <input type="file" onChange={handleChange} />
                {/**
                 *                 <button type="submit">Upload</button>
                 */}

            </form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {fileContent && file?.type === 'text/plain' && (
                <div>
                    <h2>Text File Content:</h2>
                    <pre>{fileContent as string}</pre>
                </div>
            )}

            {fileContent && file?.type === 'application/pdf' && (
                <div>
                    <h2>PDF File Content Viewing: - In the works</h2>
                    
                    {/*
                    <pre>{fileContent as string}</pre>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={fileContent as string} />
                    </Worker>*/}
                    
                </div>
            )}

            <div>
                <br></br>
                <button onClick={() => navigate("/")}>Home Page</button>
            </div>

            
        </div>
    );
};
