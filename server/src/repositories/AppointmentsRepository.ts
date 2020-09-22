import Appointment from "../models/Appointments";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointments = await this.findOne({
            where: { date },
        });

        return findAppointments || null;
    }
}

export default AppointmentsRepository;
