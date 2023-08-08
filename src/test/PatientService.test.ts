import { Patient, PatientReq } from "../api/components/patients/model";
import { PatientServiceImpl } from "../api/components/patients/service";
import { PatientRepository } from "../api/components/patients/repository";
import { ModuleBlock } from "typescript";

describe("PatientService", () => {
  let patientSerivce: PatientServiceImpl;
  let patientRepository: PatientRepository;
  const patientRes: Patient = {
    patient_id: 1,
    first_name: "Mario",
    last_name: "Triana",
    identification: "10141919579",
    phone_number: 300,
    email: "juan_perez@gmail.com"
  };
  const patientReq: PatientReq = {   
    first_name: "Mario",
    last_name: "Triana",
    identification: "10141919579",
    phone_number: 300,
    email: "juan_perez@gmail.com"
  };

  beforeEach(() => {
    patientRepository = {
        getAllPatients: jest.fn(),
      createPatient: jest.fn(),
      getPatientById: jest.fn(),
      updatePatient: jest.fn(),
      deletePatient: jest.fn(),
    };

    patientSerivce = new PatientServiceImpl(patientRepository);
  });

  describe("getAllPatients", () => {
    it("should get all patients from service", async () => {
      // Mock Process
      const patients:Patient[] = [ patientRes ];

      (patientRepository.getAllPatients as jest.Mock).mockResolvedValue(patients);

      // Method execution
      const result = await patientSerivce.getAllPatients();

      // Asserts
      //expect(patientRepository.getAllPatients).toHaveBeenCalled()
      expect(result).toEqual(patients);
    });
    it("should return an empty array when no patients are found", async () => {
      // Mock Process
      (patientRepository.getAllPatients as jest.Mock).mockResolvedValue([]);

      // Method execution
      const result = await patientSerivce.getAllPatients();

      // Asserts
      expect(patientRepository.getAllPatients).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe("createPatient", () => {
    it("should create a new patient and return it from  service", async () => {
      // Mock Process
      (patientRepository.createPatient as jest.Mock).mockResolvedValue(patientRes);

      // Method execution
      const result = await patientSerivce.createPatient(patientReq);

      // Asserts
      expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq);
      expect(result).toEqual(patientRes);
    });
    it("should throw an error if patient creation fails", async () => {
      // Mock Process
      const error1 = new Error("Failed to create patient");
      (patientRepository.createPatient as jest.Mock).mockRejectedValue(error1);

      await expect(patientSerivce.createPatient(patientReq)).rejects.toThrowError(
        error1
      );
      expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq);
    });
  });

  describe("getPatientById", () => {
    it("should get patient by id from service", async () => {
      // Mock Process

      const patientId = 1;
      (patientRepository.getPatientById as jest.Mock).mockResolvedValue(
        patientRes
      );

      // Method execution
      const result = await patientSerivce.getPatientById(patientId);

      // Asserts
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
      expect(result).toEqual(patientRes);
    });
    it("should return an empty array when no patients are found", async () => {
      // Mock Process
      const patientId = 1;
      (patientRepository.getPatientById as jest.Mock).mockResolvedValue(null);

      // Method execution
      const result = await patientSerivce.getPatientById(patientId);

      // Asserts
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
      expect(result).toBeNull();
    });
    it("should throw an error if retrieval fails", async () => {
      // Mock Process
      const patientId = 1;
      const error = new Error("Database error");
      (patientRepository.getPatientById as jest.Mock).mockRejectedValue(error);

      // Asserts
      await expect(patientSerivce.getPatientById(patientId)).rejects.toThrowError(
        error
      );
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
    });
  });
  describe("updatePatient", () => {
    it("Should update patient and return updated patient", async () => {
      // Mock Process
      const patientUpdates = patientReq;
      (patientRepository.getPatientById as jest.Mock).mockResolvedValue(
        patientRes
      );
      // Method execution
      const result: Patient = await patientSerivce.updatePatient(1, patientUpdates);
      // Asserts
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(1);
      expect(patientRepository.updatePatient).toHaveBeenCalledWith(1, patientRes);
      expect(result).toEqual(patientRes);
    });

    it("should throw an error if retrieval fails", async () => {
      // Mock Process
      const error = new Error("Failed to update patient from service");
      (patientRepository.updatePatient as jest.Mock).mockResolvedValue(null);

      // Asserts
      await expect(
        patientSerivce.updatePatient(1, patientRes)
      ).rejects.toThrowError(error);
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(1);
    });
  });
  describe("deletePatient", () => {
    it("Should delete a patient if (id: number) is provided", async () => {
      // Mocks
      (patientRepository.getPatientById as jest.Mock).mockResolvedValue(
        patientRes
      );
      // Method execution
      const result = await patientSerivce.deletePatient(1);
      // Asserts
      expect(patientRepository.getPatientById).toHaveBeenCalledWith(1);
      expect(result).toHaveBeenCalled;
    });

  it("should throw an Error if patient register does not exist", async () => {
    // Mocks
    const error = new Error('Failed to delete patient from service');
    (patientRepository.getPatientById as jest.Mock).mockResolvedValue(undefined); // Result can be null too;
              
    // Method execution
    await expect(() => patientSerivce.deletePatient(1)).rejects.toThrowError(error);
  
    // Asserts
    expect(patientRepository.getPatientById).toHaveBeenCalledWith(1);
   });
  });
});
