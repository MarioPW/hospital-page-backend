import {
  Appointment,
  AppointmentReq,
  AppointmentResDB,
} from "../api/components/appointments/model";
import {
  AppointmentServiceImpl,
  mapAppointment,
} from "../api/components/appointments/service";
import { AppointmentRepository } from "../api/components/appointments/repository";
import { DoctorRepository } from "../api/components/doctors/repository";
import { Doctor } from "../api/components/doctors/model";

describe("AppointmentService", () => {
  let appointmentService: AppointmentServiceImpl;
  let appointmentRepository: AppointmentRepository;
  let doctorRepository: DoctorRepository;

  const appointmentRes: Appointment = {
    patient_identification: "2222",
    specialty: "Medicina General",
    doctor: "Mario Triana",
    office: "string",
    schedule: "string"
  };

  const appointmentReq: AppointmentReq = {
    patient_identification: "2222",
    specialty: "Medicina General",
    doctor_id: 1,
    schedule: "string"
  };

  const appointmentResDb: AppointmentResDB = {
    appointment_id: 1,
    schedule: "string",
    specialty: "Medicina General",
    doctor_id: 2,
    patient_identification: "2222",
    created_at: "string",
    updated_at: "string"
  };

  const doctor: Doctor = {
    doctor_id: 2,
    first_name: "Mario",
    last_name: "Triana",
    specialty: "Medicina General",
    office: "string",
    email: "string",
    created_at: "string",
    updated_at: "string"
  };
  const appointmentMaped: Appointment = {
    patient_identification: "2222",
    specialty: "Medicina General",
    doctor: "Mario Triana",
    office: "string",
    schedule: "string"
  };

  beforeEach(() => {
    appointmentRepository = {
      getAllAppointments: jest.fn(),
      createAppointment: jest.fn(),
      getAppointmentById: jest.fn(),
      updateAppointment: jest.fn(),
      deleteAppointment: jest.fn(),
    };

    doctorRepository = {
      getAllDoctors: jest.fn(),
      createDoctor: jest.fn(),
      getDoctorById: jest.fn(),
      updateDoctor: jest.fn(),
      deleteDoctor: jest.fn(),
    };

    appointmentService = new AppointmentServiceImpl(
      appointmentRepository,
      doctorRepository
    );
    mapAppointment;
  });

  describe("getAllAppointments", () => {
    it("should get all appointmentss from service", async () => {
      // Mock Process
      const appointments: Appointment[] = [appointmentRes];

      (appointmentRepository.getAllAppointments as jest.Mock).mockResolvedValue(
        appointments
      );

      // Method execution
      const result = await appointmentService.getAllAppointments();

      // Asserts
      //expect(doctorRepository.getAllDoctors).toHaveBeenCalled()
      expect(result).toEqual(appointments);
    });
    it("should return an empty array when no appointments are found", async () => {
      // Mock Process
      (appointmentRepository.getAllAppointments as jest.Mock).mockResolvedValue(
        []
      );

      // Method execution
      const result = await appointmentService.getAllAppointments();

      // Asserts
      expect(appointmentRepository.getAllAppointments).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe("createAppointment", () => {
    it("should create a new appointment and return it from  service", async () => {
      // Mock Process
      (appointmentRepository.createAppointment as jest.Mock).mockResolvedValue(
        appointmentResDb
      );
      (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(doctor);

      // Method execution
      const result = await appointmentService.createAppointment(appointmentReq);
      // Asserts
      expect(appointmentRepository.createAppointment).toHaveBeenCalledWith(
        appointmentReq
      );
      expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(2);

      expect(result).toEqual(appointmentMaped);
    });
    it("should throw and error if appointment creation fails", async () => {
      // Mock Process
      const error1 = new Error("Failed to create appointment in service");
      (appointmentRepository.createAppointment as jest.Mock).mockRejectedValue(
        error1
      );

      await expect(
        appointmentService.createAppointment(appointmentReq)
      ).rejects.toThrowError(error1);
      expect(appointmentRepository.createAppointment).toHaveBeenCalledWith(
        appointmentReq
      );
    });
  });

  describe("getappointmentById", () => {
    it("should get appointment by id from service", async () => {
      // Mock Process

      const appointmentId = 1;
      (appointmentRepository.getAppointmentById as jest.Mock).mockResolvedValue(
        appointmentResDb
      );

      // Method execution
      const result = await appointmentService.getAppointmentById(appointmentId);

      // Asserts
      expect(result).toEqual(appointmentResDb);
    });

    it("should throw an error if retrieval fails", async () => {
      // Mock Process
      const appointmentId = 1;
      const error = new Error("Record has not found yet");
      (appointmentRepository.getAppointmentById as jest.Mock).mockRejectedValue(
        error
      );

      // Asserts
      await expect(
        appointmentService.getAppointmentById(appointmentId)
      ).rejects.toThrowError(error);
      expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(
        appointmentId
      );
    });
  });
  describe("updateAppointment", () => {
    it("Should update appointment and return updated appointment", async () => {
      // Mock Process
      const appointmentUpdates = appointmentRes;
      (appointmentRepository.getAppointmentById as jest.Mock).mockResolvedValue(
        appointmentRes
      );
      // Method execution
      const result: AppointmentReq = await appointmentService.updateAppointment(
        1,
        appointmentUpdates
      );
      // Asserts
      expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(1);
      expect(appointmentRepository.updateAppointment).toHaveBeenCalledWith(
        1,
        appointmentRes
      );
      expect(result).toEqual(appointmentRes);
    });

    it("should throw an error if retrieval fails", async () => {
      // Mock Process
      const error = new Error("Failed to update appointment from service");
      (appointmentRepository.updateAppointment as jest.Mock).mockResolvedValue(
        null
      );

      // Asserts
      await expect(
        appointmentService.updateAppointment(1, appointmentRes)
      ).rejects.toThrowError(error);
      expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(1);
    });

    describe("deleteAppointment", () => {
      it("Should delete appointment", async () => {
        // Mock Process
        (
          appointmentRepository.getAppointmentById as jest.Mock
        ).mockResolvedValue(appointmentResDb);

        // Method Execution
        await appointmentService.deleteAppointment(appointmentResDb.appointment_id);

        // Asserts
        expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(
          appointmentResDb.appointment_id
        );
        expect(appointmentRepository.deleteAppointment).toHaveBeenCalledWith(
          appointmentResDb.appointment_id
        );
      });
      it("Should throw an error if appointmentRepository.getAppointmentById() returns undefined register", async () => {
        // Mock Process
        const error = new Error("Failed to delete Appointment from service");
        (
          appointmentRepository.getAppointmentById as jest.Mock
        ).mockResolvedValue(undefined);

        // Method Execution and Asserts
        await expect(
          appointmentService.deleteAppointment(1)
        ).rejects.toThrowError(error);
        expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(
          1
        );
        expect(appointmentRepository.deleteAppointment).not.toHaveBeenCalled();
      });
    });
  });
});
