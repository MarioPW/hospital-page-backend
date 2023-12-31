import { Doctor, DoctorReq } from "../api/components/doctors/model";
import { DoctorServiceImpl } from "../api/components/doctors/service";
import { DoctorRepository } from "../api/components/doctors/repository";
import { ModuleBlock } from "typescript";

describe("DoctorService", () => {
  let doctorSerivce: DoctorServiceImpl;
  let doctorRepository: DoctorRepository;
  const doctorRes: Doctor = {
    doctor_id: 1,
    first_name: "Carlos",
    last_name: "Caceres",
    specialty: "Radiología",
    office: "101C",
    email: "carlos_caceres@gmail.com"
  };
  const doctorReq: DoctorReq = {   
    first_name: "Carlos",
    last_name: "Caceres",
    specialty: "Radiología",
    office: "101C",
    email: "carlos_caceres@gmail.com"
  };

  beforeEach(() => {
    doctorRepository = {
      getAllDoctors: jest.fn(),
      createDoctor: jest.fn(),
      getDoctorById: jest.fn(),
      updateDoctor: jest.fn(),
      deleteDoctor: jest.fn(),
    };

    doctorSerivce = new DoctorServiceImpl(doctorRepository);
  });

  describe("getAllDoctors", () => {
    it("should get all doctors from service", async () => {
      // Mock Process
      const doctors: Doctor[] = [ doctorRes ];

      (doctorRepository.getAllDoctors as jest.Mock).mockResolvedValue(doctors);

      // Method execution
      const result = await doctorSerivce.getAllDoctors();

      // Asserts
      //expect(doctorRepository.getAllDoctors).toHaveBeenCalled()
      expect(result).toEqual(doctors);
    });
    it("should return an empty array when no doctors are found", async () => {
      // Mock Process
      (doctorRepository.getAllDoctors as jest.Mock).mockResolvedValue([]);

      // Method execution
      const result = await doctorSerivce.getAllDoctors();

      // Asserts
      expect(doctorRepository.getAllDoctors).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe("createDoctor", () => {
    it("should create a new doctor and return it from  service", async () => {
      // Mock Process
      (doctorRepository.createDoctor as jest.Mock).mockResolvedValue(doctorRes);

      // Method execution
      const result = await doctorSerivce.createDoctor(doctorReq);

      // Asserts
      expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctorReq);
      expect(result).toEqual(doctorRes);
    });
    it("should throw an error if doctor creation fails", async () => {
      // Mock Process
      const error1 = new Error("Failed to create doctor");
      (doctorRepository.createDoctor as jest.Mock).mockRejectedValue(error1);

      await expect(doctorSerivce.createDoctor(doctorReq)).rejects.toThrowError(
        error1
      );
      expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctorReq);
    });
  });

  describe("getDoctorById", () => {
    it("should get doctor by id from service", async () => {
      // Mock Process

      const doctorId = 1;
      (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(
        doctorRes
      );

      // Method execution
      const result = await doctorSerivce.getDoctorById(doctorId);

      // Asserts
      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId);
      expect(result).toEqual(doctorRes);
    });
    it("should return an empty array when no doctors are found", async () => {
      // Mock Process
      const doctorId = 1;
      (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(null);

      // Method execution
      const result = await doctorSerivce.getDoctorById(doctorId);

      // Asserts
      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId);
      expect(result).toBeNull();
    });
    it("should throw an error if retrieval fails", async () => {
      // Mock Process
      const doctorId = 1;
      const error = new Error("Database error");
      (doctorRepository.getDoctorById as jest.Mock).mockRejectedValue(error);

      // Asserts
      await expect(doctorSerivce.getDoctorById(doctorId)).rejects.toThrowError(
        error
      );
      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId);
    });
  });
  describe("updateDoctor", () => {
    it("Should update doctor and return updated doctor", async () => {
      // Mock Process
      const doctorUpdates = doctorReq;
      (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(
        doctorRes
      );
      // Method execution
      const result: Doctor = await doctorSerivce.updateDoctor(1, doctorUpdates);
      // Asserts
      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(1);
      expect(doctorRepository.updateDoctor).toHaveBeenCalledWith(1, doctorRes);
      expect(result).toEqual(doctorRes);
    });

    it("should throw an error if retrieval fails", async () => {
      // Mock Process
      const error = new Error("Failed to update doctor from service");
      (doctorRepository.updateDoctor as jest.Mock).mockResolvedValue(null);

      // Asserts
      await expect(
        doctorSerivce.updateDoctor(1, doctorRes)
      ).rejects.toThrowError(error);
      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(1);
    });
  });
  describe("deleteDoctor", () => {
    it("Should delete a doctor if (id: number) is provided", async () => {
      // Mocks
      (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(
        doctorRes
      );
      // Method execution
      const result = await doctorSerivce.deleteDoctor(1);
      // Asserts
      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(1);
      expect(result).toHaveBeenCalled;
    });

  it("should throw an Error if doctor register does not exist", async () => {
    // Mocks
    const error = new Error('Failed to delete doctor from service');
    (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(undefined); // Result can be null too;
              
    // Method execution
    await expect(() => doctorSerivce.deleteDoctor(1)).rejects.toThrowError(error);
  
    // Asserts
    expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(1);
   });
  });
});
