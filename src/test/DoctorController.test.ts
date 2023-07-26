import { Request, Response } from "express";
import {
  DoctorController,
  DoctorControllerImpl,
} from "../api/components/doctors/controller";
import { DoctorService } from "../api/components/doctors/service";
import { Doctor, DoctorReq } from "../api/components/doctors/model";

const mockReq = {} as Request;
const mockRes = {} as Response;

describe("DoctorController", () => {
  let doctorService: DoctorService;
  let doctorController: DoctorController;

  beforeEach(() => {
    doctorService = {
      getAllDoctors: jest.fn(),
      createDoctor: jest.fn(),
      getDoctorById: jest.fn(),
      updateDoctor: jest.fn(),
      deleteDoctor: jest.fn(),
    };

    doctorController = new DoctorControllerImpl(doctorService);
    mockRes.status = jest.fn().mockReturnThis();
    mockRes.json = jest.fn().mockReturnThis();
  });

  describe("getAllDoctors", () => {
    it("should get all doctors", async () => {
      // Mock Process
      const doctors: Doctor[] = [
        {
          id_doctor: 1,
          nombre: "Carlos",
          apellido: "Caceres",
          especialidad: "Medicina General",
          consultorio: 100,
        },
        {
          id_doctor: 2,
          nombre: "Alveiro",
          apellido: "Tarsisio",
          especialidad: "Ortopedia",
          consultorio: 101,
        },
      ];

      (doctorService.getAllDoctors as jest.Mock).mockResolvedValue(doctors);

      // Method execution
      await doctorController.getAllDoctors(mockReq, mockRes);

      // Asserts
      expect(doctorService.getAllDoctors).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(doctors);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      (doctorService.getAllDoctors as jest.Mock).mockRejectedValue(error);

      await doctorController.getAllDoctors(mockReq, mockRes);

      expect(doctorService.getAllDoctors).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error getting all doctors",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("createDoctor", () => {
    it("should create a new doctor and return info", async () => {
      // Mock Process

      const doctorRes: Doctor = {
        id_doctor: 1,
        nombre: "Carlos",
        apellido: "Caceres",
        especialidad: "Medicina General",
        consultorio: 100,
      };
      const doctorReq: DoctorReq = {
        nombre: "Carlos",
        apellido: "Caceres",
        especialidad: "Medicina General",
        consultorio: 100,
      };
      (mockReq.body as DoctorReq) = doctorReq;
      (doctorService.createDoctor as jest.Mock).mockResolvedValue(doctorRes);
      // Method execution
      await doctorController.createDoctor(mockReq, mockRes);

      // Asserts
      expect(doctorService.createDoctor).toHaveBeenCalledWith(doctorReq);
      expect(mockRes.json).toHaveBeenCalledWith(doctorRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      mockReq.body = {};
      (doctorService.createDoctor as jest.Mock).mockRejectedValue(error);

      await doctorController.createDoctor(mockReq, mockRes);

      // expect(doctorService.createDoctor).toHaveBeenCalledWith({});
      expect(mockRes.json).toHaveBeenCalledWith({ message: '"nombre" is required' });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("getDoctorById", () => {
    it("should get doctor by id", async () => {
      // Mock Process
      const doctorRes: Doctor = {
        id_doctor: 1,
        nombre: "Carlos",
        apellido: "Caceres",
        especialidad: "Medicina General",
        consultorio: 100,
      };
      mockReq.params = { id: "1" };
      (doctorService.getDoctorById as jest.Mock).mockResolvedValue(doctorRes);

      // Method execution
      await doctorController.getDoctorById(mockReq, mockRes);

      // Asserts
      expect(doctorService.getDoctorById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith(doctorRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should return 400 if doctor not found", async () => {
      mockReq.params = { id: "1" };
      (doctorService.getDoctorById as jest.Mock).mockResolvedValue(null);

      await doctorController.getDoctorById(mockReq, mockRes);

      expect(doctorService.getDoctorById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Record has not found yet",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 if an error occurs", async () => {
      const error = new Error("Internal Server Error");
      mockReq.params = { id: "1" };
      (doctorService.getDoctorById as jest.Mock).mockRejectedValue(error);

      await doctorController.getDoctorById(mockReq, mockRes);

      expect(doctorService.getDoctorById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to retrieve doctor",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("updateDoctor", () => {
    it("should update a doctor and return info", async () => {
      // Mock Process
      const doctorRes: Doctor = {
        id_doctor: 1,
        nombre: "Carlos",
        apellido: "Caceres",
        especialidad: "Radiología",
        consultorio: 101,
      };
      const doctorReq: DoctorReq = {
        nombre: "Carlos",
        apellido: "Caceres",
        especialidad: "Radiología",
        consultorio: 101,
      };
      (mockReq.body as DoctorReq) = doctorReq;
      (doctorService.updateDoctor as jest.Mock).mockResolvedValue(doctorRes);

      // Method execution
      await doctorController.updateDoctor(mockReq, mockRes);

      // Asserts
      expect(doctorService.updateDoctor).toHaveBeenCalledWith(1, doctorReq);
      expect(mockRes.json).toHaveBeenCalledWith(doctorRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
    it("should return 400 if doctor not found", async () => {
      const doctorReq: DoctorReq = {
        nombre: "Carlos",
        apellido: "Caceres",
        especialidad: "Radiología",
        consultorio: 101,
      };
      mockReq.params = { id: "1" };
      (doctorService.updateDoctor as jest.Mock).mockResolvedValue(null);

      await doctorController.updateDoctor(mockReq, mockRes);

      expect(doctorService.updateDoctor).toHaveBeenCalledWith(1, doctorReq);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed updating doctor in controller",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 if an error occurs", async () => {
      const doctorReq: DoctorReq = {
        nombre: "Carlos",
        apellido: "Caceres",
        especialidad: "Radiología",
        consultorio: 101,
      };
      const error = new Error("Internal Server Error");
      mockReq.params = { id: "1" };
      (doctorService.updateDoctor as jest.Mock).mockRejectedValue(error);

      await doctorController.updateDoctor(mockReq, mockRes);

      expect(doctorService.updateDoctor).toHaveBeenCalledWith(1, doctorReq);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to update doctor",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
  describe("deleteDoctor", () => {
    it("should delete a doctor and return success message", async () => {
      // Mock Process
      mockReq.params = { id_doctor: "1" };
      (doctorService.deleteDoctor as jest.Mock).mockResolvedValue(mockRes);

      // Method execution
      await doctorController.deleteDoctor(mockReq, mockRes);

      // Asserts
      expect(doctorService.deleteDoctor).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Doctor was deleted successfully",
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should return 400 if doctor not found", async () => {
      const error = new Error("Internal Server Error");
      mockReq.params = { id_doctor: "1" };
      (doctorService.deleteDoctor as jest.Mock).mockRejectedValue(error);

      await doctorController.deleteDoctor(mockReq, mockRes);

      expect(doctorService.deleteDoctor).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to delete doctor",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});
