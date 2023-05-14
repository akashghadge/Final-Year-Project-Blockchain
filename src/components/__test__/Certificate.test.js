// this are test for GenerateCertificateModal component
import React from "react";
import { render, screen } from "@testing-library/react";
import GenerateCertificateModal from "../GenerateCertificateModal";

describe("GenerateCertificateModal Test Suit", () => {

    test('Test for Employee Details', () => {
        const props = {
            "isOpen": true,
            "certificateDetails": {
                "name": "Metaa",
                "organization": null,
                "score": "50",
                "endorsed": true,
                "visible": true,
                "isScored": true,
                "certificate_type": "Data structures",
            },
            "employee": {
                "ethAddress": "0xA50507Beb4E98A98699E78D01B95Ac43fc0AE24c",
                "name": "Emp 1",
                "location": "Pune",
                "description": "Developer",
                "overallEndorsement": "0",
                "endorsecount": "0"
            },
            "isCertificateModal": true
        };
        render(<GenerateCertificateModal {...props} />);
        const certificateOwner = screen.getByText("Emp 1");
        expect(certificateOwner).toBeInTheDocument();
    });

    test('Test for Course Details', () => {
        const props = {
            "isOpen": true,
            "certificateDetails": {
                "name": "Metaa",
                "organization": null,
                "score": "50",
                "endorsed": true,
                "visible": true,
                "isScored": true,
                "certificate_type": "Data structures",
            },
            "employee": {
                "ethAddress": "0xA50507Beb4E98A98699E78D01B95Ac43fc0AE24c",
                "name": "Emp 1",
                "location": "Pune",
                "description": "Developer",
                "overallEndorsement": "0",
                "endorsecount": "0"
            },
            "isCertificateModal": true
        };
        render(<GenerateCertificateModal {...props} />);
        const certificate_type = screen.getByText("Data structures");
        expect(certificate_type).toBeInTheDocument();
    });

    // remaining here
    test('Test for Close Button', () => {
        const props = {
            "isOpen": true,
            "certificateDetails": {
                "name": "Metaa",
                "organization": null,
                "score": "50",
                "endorsed": true,
                "visible": true,
                "isScored": true,
                "certificate_type": "Data structures",
            },
            "employee": {
                "ethAddress": "0xA50507Beb4E98A98699E78D01B95Ac43fc0AE24c",
                "name": "Emp 1",
                "location": "Pune",
                "description": "Developer",
                "overallEndorsement": "0",
                "endorsecount": "0"
            },
            "isCertificateModal": true
        };
        render(<GenerateCertificateModal {...props} />);
        const certificate_type = screen.getByText("Data structures");
        expect(certificate_type).toBeInTheDocument();
    });

    test('Test for Certificate text', () => {
        const props = {
            "isOpen": true,
            "certificateDetails": {
                "name": "Metaa",
                "organization": null,
                "score": "50",
                "endorsed": true,
                "visible": true,
                "isScored": true,
                "certificate_type": "Data structures",
            },
            "employee": {
                "ethAddress": "0xA50507Beb4E98A98699E78D01B95Ac43fc0AE24c",
                "name": "Emp 1",
                "location": "Pune",
                "description": "Developer",
                "overallEndorsement": "0",
                "endorsecount": "0"
            },
            "isCertificateModal": true
        };
        render(<GenerateCertificateModal {...props} />);
        const certificate_type = screen.getByText("This Cerificate is awarded to");
        expect(certificate_type).toBeInTheDocument();
    });

})
// turn off all warning
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());
});