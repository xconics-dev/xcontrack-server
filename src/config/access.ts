import z from "zod";
import { userTypeZodSchema } from "../validators/user/index.js";

export type userType = z.infer<typeof userTypeZodSchema>;

export type userInfoType = {
  id: string;
  type: userType;
  aggregatorId: string | null;
  lenderId: string | null;
  fieldEngineerId: string | null;
};

type AuthAccessConfigType = {
  isSameLender: (userInfo: userInfoType, inputLenderId: string) => boolean;
  getLenderId: (userInfo: userInfoType) => string | undefined;
  isSameAggregator: (
    userInfo: userInfoType,
    inputAggregatorId?: string
  ) => boolean;
  getAggregatorId: (userInfo: userInfoType) => string | undefined;
  isSameFieldEngineer: (
    userInfo: userInfoType,
    inputFieldEngineerId?: string
  ) => boolean;
  getFieldEngineerId: (userInfo: userInfoType) => string | undefined;
  all: {
    auth: userType[];
  };
  lender: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  lenderBranch: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  aggregator: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  fieldEngineer: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  warehouse: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  device: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
    list:{
      auth: userType[];
    }
  };
  deviceMovement: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  deviceTracking: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  installationRequisition: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  supportTicket: {
    create: {
      auth: userType[];
    };
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
    delete: {
      auth: userType[];
    };
  };
  installationRequisitionRequest: {
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
  };
  supportTicketRequest: {
    read: {
      auth: userType[];
    };
    update: {
      auth: userType[];
    };
  };
};

const authAccessConfig: AuthAccessConfigType = {
  isSameLender: (userInfo, inputLenderId) => {
    return userInfo.type !== "LENDER" || inputLenderId === userInfo.lenderId;
  },
  getLenderId: (userInfo) => {
    if (userInfo.type === "LENDER" && userInfo.lenderId)
      return userInfo.lenderId;
    return undefined;
  },
  isSameAggregator: (userInfo, inputAggregatorId) => {
    return (
      userInfo.type !== "AGGREGATOR" ||
      inputAggregatorId === userInfo.aggregatorId
    );
  },
  getAggregatorId: (userInfo) => {
    if (userInfo.type === "AGGREGATOR" && userInfo.aggregatorId)
      return userInfo.aggregatorId;
    return undefined;
  },
  isSameFieldEngineer: (userInfo, inputFieldEngineerId) => {
    return (
      userInfo.type !== "FIELD_ENGINEER" ||
      inputFieldEngineerId === userInfo.fieldEngineerId
    );
  },
  getFieldEngineerId: (userInfo) => {
    if (userInfo.type === "FIELD_ENGINEER" && userInfo.fieldEngineerId)
      return userInfo.fieldEngineerId;
    return undefined;
  },
  all: {
    auth: ["XCONICS", "AGGREGATOR", "LENDER", "FIELD_ENGINEER"],
  },
  lender: {
    create: {
      auth: ["XCONICS"],
    },
    read: {
      auth: ["XCONICS"],
    },
    update: {
      auth: ["XCONICS"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  lenderBranch: {
    create: {
      auth: ["LENDER", "XCONICS"],
    },
    read: {
      auth: ["LENDER", "XCONICS", "AGGREGATOR"],
    },
    update: {
      auth: ["LENDER", "XCONICS"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  aggregator: {
    create: {
      auth: ["XCONICS"],
    },
    read: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    update: {
      auth: ["XCONICS"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  fieldEngineer: {
    create: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    read: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    update: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  warehouse: {
    create: {
      auth: ["XCONICS"],
    },
    read: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    update: {
      auth: ["XCONICS"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  device: {
    create: {
      auth: ["XCONICS"],
    },
    read: {
      auth: ["XCONICS", "AGGREGATOR", "FIELD_ENGINEER"],
    },
    update: {
      auth: ["XCONICS", "FIELD_ENGINEER"],
    },
    delete: {
      auth: ["XCONICS", "FIELD_ENGINEER"],
    },
    list:{
      auth: ["XCONICS", "AGGREGATOR", "LENDER", "FIELD_ENGINEER"],
    }
  },
  deviceMovement: {
    create: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    read: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    update: {
      auth: ["XCONICS", "AGGREGATOR"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  deviceTracking: {
    create: {
      auth: ["XCONICS"],
    },
    read: {
      auth: ["XCONICS", "LENDER"],
    },
    update: {
      auth: ["XCONICS"],
    },
    delete: {
      auth: [],
    },
  },
  installationRequisition: {
    create: {
      auth: ["XCONICS", "LENDER"],
    },
    read: {
      auth: ["XCONICS", "LENDER", "AGGREGATOR", "FIELD_ENGINEER"],
    },
    update: {
      auth: ["XCONICS", "LENDER", "AGGREGATOR", "FIELD_ENGINEER"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  supportTicket: {
    create: {
      auth: ["XCONICS", "LENDER"],
    },
    read: {
      auth: ["XCONICS", "LENDER", "AGGREGATOR", "FIELD_ENGINEER"],
    },
    update: {
      auth: ["XCONICS", "LENDER", "AGGREGATOR", "FIELD_ENGINEER"],
    },
    delete: {
      auth: ["XCONICS"],
    },
  },
  installationRequisitionRequest: {
    read: {
      auth: ["AGGREGATOR", "FIELD_ENGINEER"],
    },
    update: {
      auth: ["AGGREGATOR", "FIELD_ENGINEER"],
    },
  },
  supportTicketRequest: {
    read: {
      auth: ["AGGREGATOR", "FIELD_ENGINEER"],
    },
    update: {
      auth: ["AGGREGATOR", "FIELD_ENGINEER"],
    },
  },
};

export default authAccessConfig;
