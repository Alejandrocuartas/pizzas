import {httpServer} from "../index"
import request from "supertest"

afterAll(async() => await httpServer.close())
describe('GraphQL Server', () => {
  test('returns the query resolved', async () => {
    const query = {
        query: `query Query($period: TimePeriod!) {
                    soldUnits(period: $period) {
                        branco
                    }
                }`,
        variables: {"period": {
            "endDay": "02",
            "endMonth": "01",
            "startDay": "01",
            "startMonth":"01"
        }}
      }

    const response = await request(httpServer)
      .post('/graphql')
      .send(query)
    expect(response.body.data.soldUnits.branco).toEqual(100);
  });
});