import cron from "node-cron";
import installationRequisitionDb from "../../models/installationRequisition/index.js";
import supportTicketDb from "../../models/supportTicket/index.js";

// Runs every hour at 0 minute
cron.schedule("0 * * * *", async () => {
  console.log("Cron started:", new Date());

  try {
    const installationRequests =
      await installationRequisitionDb.findRequestsNotAccepted();

    if (installationRequests.length)
      await Promise.all(
        installationRequests.map(async (request) => {
          await installationRequisitionDb.rejectRequest(request.id);
        })
      );
    else {
      console.log("No pending installation requests");
    }
    const supportTickets = await supportTicketDb.findRequestsNotAccepted();

    if (supportTickets.length)
      await Promise.all(
        supportTickets.map(async (request) => {
          await supportTicketDb.rejectRequest(request.id);
        })
      );
    else {
      console.log("No pending support ticket requests");
    }
  } catch (err) {
    console.error("Cron error:", err);
  }
});
