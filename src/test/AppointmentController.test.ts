import { Request, Response } from "express";
import {
  AppointmentController,
  AppointmentControllerImpl,
} from "../api/components/appointments/controller";
import { AppointmentService } from "../api/components/appointments/service";
import {
  Appointment,
  AppointmentReq,
  AppointmentResDB,
} from "../api/components/appointments/model";

const mockReq = {} as Request;
const mockRes = {} as Response;

describe("AppointmentController", () => {
  let appointmentService: AppointmentService;
  let appointmentController: AppointmentController;
  const appointmentReq: AppointmentReq = {
    identificacion_paciente: "string",
    especialidad: "new string",
    id_doctor: 1,
    horario: "new string",
  };
  const appointmentRes: AppointmentResDB = {
    id_cita: 1,
    horario: "new string",
    especialidad: "new string",
    id_doctor: 1,
    identificacion_paciente: "string",
    created_at: "string",
    updated_at: "string",
  };

  beforeEach(() => {
    appointmentService = {
      getAllAppointments: jest.fn(),
      createAppointment: jest.fn(),
      getAppointmentById: jest.fn(),
      updateAppointment: jest.fn(),
      deleteAppointment: jest.fn(),
    };

    appointmentController = new AppointmentControllerImpl(appointmentService);
    mockRes.status = jest.fn().mockReturnThis();
    mockRes.json = jest.fn().mockReturnThis();
  });

  describe("getAllAppointments", () => {
    it("should get all appointment", async () => {
      // Mock Process
      const appointments: Appointment[] = [
        {
          identificacion_paciente: "123456",
          especialidad: "Especialidad",
          doctor: "string",
          consultorio: 1,
          horario: "string",
        },
        {
          identificacion_paciente: "123456",
          especialidad: "Especialidad",
          doctor: "string",
          consultorio: 2,
          horario: "string",
        },
      ];

      (appointmentService.getAllAppointments as jest.Mock).mockResolvedValue(
        appointments
      );

      // Method execution
      await appointmentController.getAllAppointments(mockReq, mockRes);

      // Asserts
      expect(appointmentService.getAllAppointments).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(appointments);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      (appointmentService.getAllAppointments as jest.Mock).mockRejectedValue(
        error
      );

      await appointmentController.getAllAppointments(mockReq, mockRes);

      expect(appointmentService.getAllAppointments).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error getting all appointments",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("createAppointment", () => {
    it("Should create a new appointment and return info", async () => {
      (mockReq.body as AppointmentReq) = appointmentReq;
      (appointmentService.createAppointment as jest.Mock).mockResolvedValue(
        appointmentRes
      );
      await appointmentController.createAppointment(mockReq, mockRes);
      expect(appointmentService.createAppointment).toHaveBeenCalledWith(
        appointmentReq
      );
      expect(mockRes.json).toHaveBeenCalledWith(appointmentRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
    it("should be handler error and return 400 status", async () => {
      const error = new Error("Internal Server Error");
      (appointmentService.createAppointment as jest.Mock).mockRejectedValue(
        error
      );

      await appointmentController.createAppointment(mockReq, mockRes);

      expect(appointmentService.createAppointment).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("getAppointmentById", () => {
    it("should get appointment by id", async () => {
      // Mock Process
      mockReq.params = { id: "1" };
      (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(
        appointmentRes
      );

      // Method execution
      await appointmentController.getAppointmentById(mockReq, mockRes);

      // Asserts
      expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith(appointmentRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it("should return 400 if appointment not found", async () => {
      mockReq.params = { id: "1" };
      (appointmentService.getAppointmentById as jest.Mock).mockResolvedValue(
        null
      );

      await appointmentController.getAppointmentById(mockReq, mockRes);

      expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Record has not found yet",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 if an error occurs", async () => {
      const error = new Error("Internal Server Error");
      mockReq.params = { id: "1" };
      (appointmentService.getAppointmentById as jest.Mock).mockRejectedValue(
        error
      );

      await appointmentController.getAppointmentById(mockReq, mockRes);

      expect(appointmentService.getAppointmentById).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Failed to retrieve appointment",
      });
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("updateAppointment", () => {
    it("should update an appointment and return info", async () => {
      // Mock Process
      (mockReq.body as AppointmentReq) = appointmentReq;
      (appointmentService.updateAppointment as jest.Mock).mockResolvedValue(appointmentRes);

      // Method execution
      await appointmentController.updateAppointment(mockReq, mockRes);

      // Asserts
      expect(appointmentService.updateAppointment).toHaveBeenCalledWith(1, appointmentReq);
      expect(mockRes.json).toHaveBeenCalledWith(appointmentRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
    it("should be handler error and return 400 status", async () => {
      // Mocks
      const error = {"error": "Failed updating appointment in controller"};
      (appointmentService.updateAppointment as jest.Mock).mockResolvedValue(undefined);
      // Method execution
      await appointmentController.updateAppointment(mockReq, mockRes);
      // Asserts
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(error);
    });
  });
  describe("deleteAppoinment", () => {
    it("Should delete appiontment and return success message", async () => {
      // Mocks 
      const successsMesasge = {message: `Appointment was deleted successfully`};
      mockReq.params = { id: "1" };
      // Execution
      await appointmentController.deleteAppointment(mockReq, mockRes);
      // Asserts
      expect(appointmentService.deleteAppointment).toHaveBeenCalledWith(1)
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(successsMesasge);
    });
    it("should handle error and return 400 status", async () => {
      // Mocks 
      const errorMessage = "Failed to delete Appointment";
      const mockId = "1";
      mockReq.params = { id: mockId };

      appointmentService.deleteAppointment = jest.fn().mockRejectedValue(new Error(errorMessage));
  
      // Execution
      await appointmentController.deleteAppointment(mockReq, mockRes);
  
      // Asserts
      expect(appointmentService.deleteAppointment).toHaveBeenCalledWith(parseInt(mockId));
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
