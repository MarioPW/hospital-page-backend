import { Request, Response } from "express";
import {
  PatientController,
  PatientControllerImpl,
} from "../api/components/patients/controller";
import { PatientService } from "../api/components/patients/service";
import { Patient, PatientReq } from "../api/components/patients/model";

const mockReq = {} as Request;
const mockRes = {} as Response;

describe("PatientController", () => {
  let patientService: PatientService;
  let patientController: PatientController;
  const patientRes: Patient = {
    patient_id: 123,
    first_name: "Juan",
    last_name: "Perez",
    identification: "c.c.1126267213",
    phone_number: 123,
    email: "juan_perez@gmail.com"
  };
  const patientReq: PatientReq = {
    first_name: "Juan",
    last_name: "Perez",
    identification: "1126267213",
    phone_number: 123,
    email: "juan_perez@gmail.com"
  };

  beforeEach(() => {
    patientService = {
      getAllPatients: jest.fn(),
      createPatient: jest.fn(),
      getPatientById: jest.fn(),
      updatePatient: jest.fn(),
      deletePatient: jest.fn(),
    };

    patientController = new PatientControllerImpl(patientService);
    mockRes.status = jest.fn().mockReturnThis();
    mockRes.json = jest.fn().mockReturnThis();
  }); 
  describe('getAllPatients', () => { 
    it("Should get all patients from repository", async () => {
         // Mock Process
      const patients: Patient[] = [ patientRes ];

      (patientService.getAllPatients as jest.Mock).mockResolvedValue(patients);

      // Method execution
      await patientController.getAllPatients(mockReq, mockRes);

      // Asserts
      expect(patientService.getAllPatients).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(patients);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    }
    );
    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      (patientService.getAllPatients as jest.Mock).mockRejectedValue(error);

      await patientController.getAllPatients(mockReq, mockRes);

      expect(patientService.getAllPatients).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error getting all patients",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
   });

   describe("createPatient", () => {
    it("should create a new patient and return info", async () => {
      // Mock Process
      (mockReq.body as PatientReq) = patientReq;
      (patientService.createPatient as jest.Mock).mockResolvedValue(patientRes);
      // Method execution
      await patientController.createPatient(mockReq, mockRes);
      // Asserts
      expect(patientService.createPatient).toHaveBeenCalledWith(patientReq);
      expect(mockRes.json).toHaveBeenCalledWith(patientRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      mockReq.body = {};
      (patientService.createPatient as jest.Mock).mockRejectedValue(error);

      await patientController.createPatient(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: '"first_name" is required' });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
    describe("getPatientById", () => {
      it("should get patient by id", async () => {
        // Mock Process
        mockReq.params = { id: "1" };
        (patientService.getPatientById as jest.Mock).mockResolvedValue(patientRes);
  
        // Method execution
        await patientController.getPatientById(mockReq, mockRes);
  
        // Asserts
        expect(patientService.getPatientById).toHaveBeenCalledWith(1);
        expect(mockRes.json).toHaveBeenCalledWith(patientRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
      });
  
      it("should return 400 if patient not found", async () => {
        mockReq.params = { id: "1" };
        (patientService.getPatientById as jest.Mock).mockResolvedValue(null);
  
        await patientController.getPatientById(mockReq, mockRes);
  
        expect(patientService.getPatientById).toHaveBeenCalledWith(1);
        expect(mockRes.json).toHaveBeenCalledWith({
          error: "Record has not found yet",
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });
  
      it("should return 400 if an error occurs", async () => {
        const error = new Error("Internal Server Error");
        mockReq.params = { id: "1" };
        (patientService.getPatientById as jest.Mock).mockRejectedValue(error);
  
        await patientController.getPatientById(mockReq, mockRes);
  
        expect(patientService.getPatientById).toHaveBeenCalledWith(1);
        expect(mockRes.json).toHaveBeenCalledWith({
          error: "Failed to retrieve patient",
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });
    });

    describe("updatePatient", () => {
      it("should update a patient and return info", async () => {
        // Mock Process
        (mockReq.body as PatientReq) = patientReq;
        (patientService.updatePatient as jest.Mock).mockResolvedValue(patientRes);
  
        // Method execution
        await patientController.updatePatient(mockReq, mockRes);
  
        // Asserts
        expect(patientService.updatePatient).toHaveBeenCalledWith(1, patientReq);
        expect(mockRes.json).toHaveBeenCalledWith(patientRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
      });
      it("should return 400 if patient not found", async () => {
  
        mockReq.params = { id: "1" };
        (patientService.updatePatient as jest.Mock).mockResolvedValue(null);
  
        await patientController.updatePatient(mockReq, mockRes);
  
        expect(patientService.updatePatient).toHaveBeenCalledWith(1, patientReq);
        expect(mockRes.json).toHaveBeenCalledWith({
          error: "Failed updating patient in controller",
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });
  
      it("should return 400 if an error occurs", async () => {
  
        const error = new Error("Internal Server Error");
        mockReq.params = { id: "1" };
        (patientService.updatePatient as jest.Mock).mockRejectedValue(error);
  
        await patientController.updatePatient(mockReq, mockRes);
  
        expect(patientService.updatePatient).toHaveBeenCalledWith(1, patientReq);
        expect(mockRes.json).toHaveBeenCalledWith({
          error: "Failed to update patient",
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });
    });
    describe("deletePatient", () => {
      it("should delete a patient and return success message", async () => {
        // Mock Process
        const id = "123"
        mockReq.params = { id: id };
        (patientService.deletePatient as jest.Mock).mockResolvedValue(mockRes);
  
        // Method execution
        await patientController.deletePatient(mockReq, mockRes);
  
        // Asserts
        expect(patientService.deletePatient).toHaveBeenCalledWith(parseInt(id));
        expect(mockRes.json).toHaveBeenCalledWith({
          message: `Patient ${id} was deleted successfully`,
        });
        expect(mockRes.status).toHaveBeenCalledWith(200);
      });
  
      it("should return 400 if patient not found", async () => {
        const error = new Error("Internal Server Error");
        mockReq.params = { id: "1" };
        (patientService.deletePatient as jest.Mock).mockRejectedValue(error);
  
        await patientController.deletePatient(mockReq, mockRes);
  
        expect(patientService.deletePatient).toHaveBeenCalledWith(1);
        expect(mockRes.json).toHaveBeenCalledWith({
          error: "Failed to delete patient",
        });
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });

});});});